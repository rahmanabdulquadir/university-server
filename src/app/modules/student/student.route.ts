import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { updateStudentValidationSchema } from "./students.zod.validation";

const router = express.Router();

//api/v1/students/create-student

//will call controller function from here
router.get("/", StudentControllers.getAllStudents);
router.get("/:studentId", StudentControllers.getASingleStudent);
router.patch(
  "/:studentId",
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent
);
router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;
