import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
    try {
        const { password, student: studentData } = req.body;

        const result = await UserServices.createStudentIntoDB(password, studentData);
        return result
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something went to wrong',
            data: error
        })
    }
}