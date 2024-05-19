import Joi from "joi";

const userNameValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  middleName: Joi.string(),
  lastName: Joi.string().required(),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// Define the main schema
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required().messages({
    "string.base": "Student ID must be a string",
    "string.empty": "Student ID cannot be empty",
    "any.required": "Student ID is required",
  }),
  name: userNameValidationSchema.required().messages({
    "any.required": "Name is required",
  }),
  gender: Joi.string()
    .valid("Male", "Female", "Other")
    .required()
    .messages({
      "string.base": "Gender must be a string",
      "any.only": 'Gender must be "Male", "Female", or "Other"',
      "any.required": "Gender is required",
    }),
  dateOfBirth: Joi.string().allow("").messages({
    "string.base": "Date of birth must be a string",
  }),
  email: Joi.string().email().required().trim().messages({
    "string.base": "Email must be a string",
    "string.email": "Email must be a valid email address",
    "string.empty": "Email cannot be empty",
    "any.required": "Email is required",
  }),
  contactNo: Joi.string().required().trim().messages({
    "string.base": "Contact number must be a string",
    "string.empty": "Contact number cannot be empty",
    "any.required": "Contact number is required",
  }),
  emergencyNo: Joi.string().required().messages({
    "string.base": "Emergency contact number must be a string",
    "string.empty": "Emergency contact number cannot be empty",
    "any.required": "Emergency contact number is required",
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .messages({
      "string.base": "Blood group must be a string",
      "any.only":
        'Blood group must be "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", or "O-"',
    }),
  presentAddress: Joi.string().required().messages({
    "string.base": "Present address must be a string",
    "string.empty": "Present address cannot be empty",
    "any.required": "Present address is required",
  }),
  permanentAddress: Joi.string().required().messages({
    "string.base": "Permanent address must be a string",
    "string.empty": "Permanent address cannot be empty",
    "any.required": "Permanent address is required",
  }),
  guardian: guardianValidationSchema.required().messages({
    "any.required": "Guardian information is required",
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    "any.required": "Local guardian information is required",
  }),
  profileImg: Joi.string().required().trim().messages({
    "string.base": "Profile image must be a string",
    "string.empty": "Profile image cannot be empty",
    "any.required": "Profile image is required",
  }),
  isActive: Joi.string()
    .valid("active", "blocked")
    .default("active")
    .messages({
      "string.base": "Status must be a string",
      "any.only": 'Status must be "active" or "blocked"',
    }),
});

export default studentValidationSchema;