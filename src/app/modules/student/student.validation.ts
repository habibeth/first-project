import { boolean, z } from "zod";

// UserName schema
const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: 'First Name must start with a capital letter',
        }),
    middleName: z.string().optional(),
    lastName: z.string()
});

// Guardians schema
const guardiansValidationSchema = z.object({
    fatherName: z.string(),
    fatherOccupation: z.string(),
    fatherContactNo: z.string(),
    motherName: z.string(),
    motherOccupation: z.string(),
    motherContactNo: z.string(),
});

// LocalGuardians schema
const localGuardiansValidationSchema = z.object({
    name: z.string(),
    occupation: z.string(),
    contactNumber: z.string(),
    address: z.string(),
});

// Student schema
const studentValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20, { message: "Password Maximum 20 Character" }),
    name: userNameValidationSchema,
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string().optional(),
    email: z.string()
        .email({ message: "Invalid email address" }),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardians: guardiansValidationSchema,
    localGuardians: localGuardiansValidationSchema,
    profileImage: z.string().trim().optional(),
    isActive: z.enum(["Active", "Inactive"]).default("Active"),
    isDeleted: z.boolean().default(false)
});

export default studentValidationSchema
