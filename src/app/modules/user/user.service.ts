import config from "../../config";
import { TStudent } from "../student/student.interface";
import { TUser } from "./user.interface"
import { User } from "./user.model"



const createStudentIntoDB = async (password: string, studentData: TStudent) => {
    //create user object
    const userData: Partial<TUser> = {}
    //if password not given
    userData.password = password || config.default_password as string

    //student role
    userData.role = 'student'

    //set manually generated id
    userData.id = '2030010001'

    //create a user
    const result = await User.create(userData);

    //create a student
    if (Object.keys(result).length) {
        //set id , _id as user
        studentData.id = result.id;
        studentData.user = result._id;
    }

    return result;
}


export const UserServices = {
    createStudentIntoDB,
}