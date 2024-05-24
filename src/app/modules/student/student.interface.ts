import { Model, Types } from "mongoose";

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TGuardians = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TLocalGuardians = {
    name: string;
    occupation: string;
    contactNumber: string;
    address: string;
}

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    password: string;
    name: TUserName;
    gender: "male" | "female" | "other";
    dateOfBirth?: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    guardians: TGuardians;
    localGuardians: TLocalGuardians;
    profileImage?: string;
    isActive: "Active" | "Inactive";
    isDeleted: boolean;
}


//custom static methods

export interface StudentModel extends Model<TStudent> {
    isUserExists(id: string): Promise<TStudent | null>
}


//custom instance method

// export type StudentMethods = {
//     isUserExists(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent, {}, StudentMethods>
