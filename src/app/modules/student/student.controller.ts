import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./students.zod.validation";

//create a student in db
const createStudent = async (req: Request, res: Response) => {
  //zod validation schema:

  try {

    const { student: studentData } = req.body;

    //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    //data validation using zod
    const zodParsedData = studentValidationSchema.parse(studentData)
    const result = await StudentServices.createStudentDataIntoDB(zodParsedData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong",
    //     error: error.details,
    //   });
    // }

    // will call service func to send this data

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

//get all the students data from db
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

//get a single student from data from db
const getASingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  try {
    const result = await StudentServices.getStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student is retrieved successfully ",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

//delete student
const deleteStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  try {
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student deleted successfully ",
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getASingleStudent,
  deleteStudent,
};
