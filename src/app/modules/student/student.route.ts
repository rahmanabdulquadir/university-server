import express from "express"
import { StudentControllers } from "./student.controller"


const router = express.Router()

//api/v1/students//create-student

//will call controller function from here
router.get('/', StudentControllers.getAllStudents)
router.get('/:studentId', StudentControllers.getASingleStudent)
router.delete('/:studentId', StudentControllers.deleteStudent)

export const StudentRoutes = router;