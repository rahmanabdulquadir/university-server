import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

//get all the students data from db
const getAllStudents = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Students are retrieved successfully",
      data: result,
    });
  }
);

//get a single student from data from db
const getASingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { studentId } = req.params;
  try {
    const result = await StudentServices.getStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

//delete student
const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { studentId } = req.params;
  try {
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student deleted successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const StudentControllers = {
  getAllStudents,
  getASingleStudent,
  deleteStudent,
};
