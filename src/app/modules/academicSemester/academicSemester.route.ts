import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

//post a semester
router.post(
  "/create-academic-semester",
  validateRequest(
    AcademicSemesterValidations.createAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.createAcademicSemester
);

// get a single academic semester
router.get(
  "/:semesterId",
  AcademicSemesterControllers.getSingleAcademicSemester
);

// update a academic semester
router.patch(
  "/:semesterId",
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterControllers.updateAcademicSemester
);

// get all the semester
router.get("/", auth('admin'), AcademicSemesterControllers.getAllAcademicSemesters);

export const AcademicSemesterRoutes = router;
