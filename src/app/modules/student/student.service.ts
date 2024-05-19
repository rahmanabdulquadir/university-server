import { TStudent } from "./student.interface";
import { Student } from "../student.model";

const createStudentDataIntoDB = async (studentData: TStudent) => {

  // const student = new Student(studentData);

  if(await Student.isUserExists(studentData.id)){
    throw new Error("User already existssssssssss!")
  }
  const result = await Student.create(studentData); //built in static method


  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User already exists!");
  // }
  // const result = await student.save();

  //
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{$match: {id: id}}])
  return result;
};

const deleteStudentFromDB = async(id: string) => {
  const result = await Student.updateOne({id}, {isDeleted: true})
  return result
}

export const StudentServices = {
  createStudentDataIntoDB,
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
