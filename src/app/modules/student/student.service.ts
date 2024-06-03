import { Student } from "./student.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate("admissionSemester").populate("academicDepartment");
  return result;
};

const getStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate("admissionSemester", "academicDepartment");
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentFromDB,
  deleteStudentFromDB,
};
