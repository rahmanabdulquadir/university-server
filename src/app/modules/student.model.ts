import {  Schema, model } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from "./student/student.interface";
// import validator from 'validator';
import bcrypt from 'bcrypt';
import config from "../config/index";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    //validation and error message
    required: [true, "First Name is required"],
    trim: true,
    maxlength: [20, "First Name can not be more than 20 characters"],
    // validate: {
    //   validator: function(value: string){
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value
    //   }
    // },
    message: "{VALUE} is not in capitalize format",
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    // validate: (value:string) => validator.isAlpha(value),
    // message: "{VALUE} is not valid"
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
    trim: true,
  },
  motherName: {
    type: String,
    required: true,
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: true,
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: true,
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Student ID is required"],
    maxLength: [20, "Password must be under 20 characters"]
  },
  name: {
    type: userNameSchema,
    required: [true, "Name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "Other"],
      message: "{VALUE} is not a valid gender",
    },
    required: [true, "Gender is required"],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    // validate: (value: string) => validator.isEmail(value),
    // message: "{VALUE} is not a valid email."
  },
  contactNo: {
    type: String,
    required: [true, "Contact number is required"],
    trim: true,
  },
  emergencyNo: {
    type: String,
    required: [true, "Emergency contact number is required"],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      message: "{VALUE} is not a valid blood group",
    },
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required"],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required"],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian information is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian information is required"],
  },
  profileImg: {
    type: String,
    required: [true, "Profile image is required"],
    trim: true,
  },
  isActive: {
    type: String,
    enum: {
      values: ["active", "blocked"],
      message: "{VALUE} is not a valid status",
    },
    default: "active",
  },
  isDeleted:{
    type: Boolean,
    default: false
  }
},{
  toJSON: {
    virtuals: true,
  }
},);

// mongoose virtual

studentSchema.virtual('fullName').get(function(){
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName} `
  )
})



// pre save middleware/hook: will work on create() and save()

studentSchema.pre("save", async function(next){
  // console.log(this, "pre hook: we will save data")
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))

  next()
})

studentSchema.post("save", function(doc, next){
  doc.password = '';
  next()
})


//query middleware

studentSchema.pre("find", function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})

studentSchema.pre("findOne", function(next){
  this.find({isDeleted: {$ne: true}})
  next()
})


studentSchema.pre("aggregate", function(next){
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next()
})
// creating a custom static method

studentSchema.statics.isUserExists = async (id) => {
  const existingUser = await Student.findOne({id})
  return existingUser;
}

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });

//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
