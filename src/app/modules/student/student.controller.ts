import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
// import Joi from 'joi'
// import studentValidationSchema from "./student.validation";


const createStudent = async (req: Request, res: Response) => {
    try {
        //create a schema validation using zod





        const { student: studentData } = req.body;

        const zodParsedData = studentValidationSchema.parse(studentData)

        // const { error, value } = studentValidationSchema.validate(studentData);

        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: "See these Error message",
        //         error: error.details
        //     })
        // }

        const result = await StudentServices.createStudentIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Student Created Successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went to wrong!",
            data: error
        })
    }
}

const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();
        res.status(200).json({
            success: true,
            message: "Student are retrieved Successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went to wrong!",
            data: error
        })
    }
}

const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student are retrieved Successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went to wrong!",
            data: error
        })
    }
}


const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student Data Deleted Successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went to wrong!",
            data: error
        })
    }
}


export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}