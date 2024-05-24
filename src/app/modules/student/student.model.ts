import { Schema, model } from 'mongoose';
import { StudentModel, TGuardians, TLocalGuardians, TStudent, TUserName } from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt'
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, "First Name is Required!"],
        trim: true,
        maxLength: [20, "First Name must be less than 20 Character"],
        validate: {
            validator: function (value: string) {
                const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value
            },
            message: "Your name {VALUE} is not capitalize"
        }
    },
    middleName: { type: String, trim: true, },
    lastName: {
        type: String,
        required: [true, "Last Name is Required!"],
        trim: true,
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: '{VALUE} is not valid'
        }
    }
});

const guardiansSchema = new Schema<TGuardians>({
    fatherName: { type: String, required: [true, "Father's Name is Required!"] },
    fatherOccupation: { type: String, required: [true, "Father's Occupation is Required!"] },
    fatherContactNo: { type: String, required: [true, "Father's Contact Number is Required!"] },
    motherName: { type: String, required: [true, "Mother's Name is Required!"] },
    motherOccupation: { type: String, required: [true, "Mother's Occupation is Required!"] },
    motherContactNo: { type: String, required: [true, "Mother's Contact Number is Required!"] },
});

const localGuardiansSchema = new Schema<TLocalGuardians>({
    name: { type: String, required: [true, "Local Guardian's Name is Required!"] },
    occupation: { type: String, required: [true, "Local Guardian's Occupation is Required!"] },
    contactNumber: { type: String, required: [true, "Local Guardian's Contact Number is Required!"] },
    address: { type: String, required: [true, "Local Guardian's Address is Required!"] },
});

const studentSchema = new Schema<TStudent, StudentModel>({
    id: { type: String, required: [true, "Student ID is Required!"], unique: true, trim: true, },
    user: {
        type: Schema.Types.ObjectId,
        required: [true, "User id is Required"],
        unique: true,
        ref: 'User',
    },
    password: { type: String, required: [true, "Password is Required!"], max: [20, "Password less than or Equal 20"] },
    name: {
        type: userNameSchema,
        required: [true, "Student's Name is Required!"]
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: "Gender must be either male, female, or other"
        },
        trim: true,
        required: [true, "Gender is Required!"]
    },
    dateOfBirth: { type: String },
    email: {
        type: String,
        required: [true, "Email is Required!"],
        unique: true,
        trim: true,
        validate: {
            validator: (value: string) => validator.isEmail(value),
            message: "{VALUE} is not a valid email"
        }
    },
    contactNo: { type: String, required: [true, "Contact Number is Required!"], trim: true, },
    emergencyContactNo: { type: String, required: [true, "Emergency Contact Number is Required!"], trim: true, },
    bloodGroup: {
        type: String,
        trim: true,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: "Blood Group must be one of 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'"
        }
    },
    presentAddress: { type: String, required: [true, "Present Address is Required!"] },
    permanentAddress: { type: String, required: [true, "Permanent Address is Required!"] },
    guardians: {
        type: guardiansSchema,
        required: [true, "Guardians Information is Required!"]
    },
    localGuardians: {
        type: localGuardiansSchema,
        required: [true, "Local Guardians Information is Required!"]
    },
    profileImage: { type: String, trim: true, },
    isActive: {
        type: String,
        trim: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: {
        virtuals: true
    }
}
);


//virtual
studentSchema.virtual('fullName').get(function () {
    return (
        `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
    )
})


studentSchema.pre('save', async function (next) {
    // console.log(this, "Student Schema Before The Save Data!");
    // password Hashing 
    const user = this; //documents
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );

    next();
})
studentSchema.post('save', async function (doc, next) {
    doc.password = ""
    // console.log(this, "Student Schema After The Save Data!");
    next()
})

studentSchema.pre('find', async function (next) {
    this.find({ isDeleted: { $ne: true } })

    next()
})

studentSchema.pre('findOne', async function (next) {
    this.find({ isDeleted: { $ne: true } })

    next()
})

studentSchema.pre('aggregate', async function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })

    next()
})


//custom static methods
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
}



//custom instance method

// studentSchema.methods.isUserExists = async function (id: string) {
//     const existingUser = await Student.findOne({ id });
//     return existingUser;
// }

export const Student = model<TStudent, StudentModel>("Student", studentSchema)