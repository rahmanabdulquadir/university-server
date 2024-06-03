import { z } from "zod";

// Define sub-schemas for nested objects
const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).trim(),
  middleName: z.string().optional(),
  lastName: z.string().min(1).trim(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string().min(1).trim(),
  fatherOccupation: z.string().min(1).trim(),
  fatherContactNo: z.string().min(1).trim(),
  motherName: z.string().min(1).trim(),
  motherOccupation: z.string().min(1).trim(),
  motherContactNo: z.string().min(1).trim(),
});

const createLocalGuardianValidationSchema = z.object({
  name: z.string().min(1).trim(),
  occupation: z.string().min(1).trim(),
  contactNo: z.string().min(1).trim(),
  address: z.string().min(1).trim(),
});

// Define the main schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      admissionSemester: z.string(),
      profileImg: z.string(),
      academicDepartment: z.string(),
    }),
  })
})

// export const createStudentValidationSchema = z.object({
//   body: z.object({
//     password: z.string().max(20),
//     student: z.object({
//       name: createUserNameValidationSchema,
//       gender: z.enum(['male', 'female', 'other']),
//       dateOfBirth: z.string().optional(),
//       email: z.string().email(),
//       contactNo: z.string(),
//       emergencyContactNo: z.string(),
//       bloogGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
//       presentAddress: z.string(),
//       permanentAddress: z.string(),
//       guardian: createGuardianValidationSchema,
//       localGuardian: createLocalGuardianValidationSchema,
//       admissionSemester: z.string(),
//       profileImg: z.string(),
//       academicDepartment: z.string(),
//     }),
//   }),
// });

export const studentValidations = {
  createStudentValidationSchema,
};
