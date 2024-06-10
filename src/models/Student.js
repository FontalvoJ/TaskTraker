import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    id_institution: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    roles: [
      {
          type: Schema.Types.ObjectId,
          ref: "Role"
      }
  ]
  },
  {
    timestamps: true,
    versionKey: false,
    collection: 'students'
  }
);

studentSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

studentSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

export default model('Student', studentSchema);
