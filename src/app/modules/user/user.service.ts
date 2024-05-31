import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentDataIntoDB = async (
  password: string,
  studentData: TStudent
) => {
  // create a user
  const userData: Partial<TUser> = {};
  // if password not given set default password
  userData.password = password || (config.default_password as string);
  // set student role
  userData.role = "student";
  // set auto generated id
  const generatedStudentId = (payload: TAcademicSemester) => {

  }
  userData.id = generatedStudentId();

  // create a user
  const newUser = await User.create(userData);
  // create a student
  if (Object.keys(newUser).length) {
    // set id, set _id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentDataIntoDB,
};
