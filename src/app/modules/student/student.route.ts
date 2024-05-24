import express from 'express'
import { StudentControllers } from './student.controller';

const router = express.Router();

//will call controller
router.get("/", StudentControllers.getAllStudents)
router.get("/:studentId", StudentControllers.getSingleStudent)
router.delete("/:studentId", StudentControllers.deleteStudent)
router.post("/create-student", StudentControllers.createStudent)


export const StudentRoutes = router;