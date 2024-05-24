import { Student } from "./student.model";
import { TStudent } from "./student.interface";



const createStudentIntoDB = async (studentData: TStudent) => {
    //creating an static methods
    if (await Student.isUserExists(studentData.id)) {
        throw new Error('User ALready Exists')
    }

    const result = await Student.create(studentData);
    //built in static method


    //creating an instance method

    // const student = new Student(studentData); //create an instance

    // if (await student.isUserExists(student.id)) {
    //     throw new Error('User ALready Exists')
    // }

    // const result = await student.save() //built in instance method

    return result;
}

const getAllStudentFromDB = async () => {
    const result = await Student.find();
    return result
}

const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id });

    const result = await Student.aggregate([
        { $match: { id: id } }
    ])
    return result;
}

const deleteStudentFromDB = async (id: string) => {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
}

export const StudentServices = {
    createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB
}