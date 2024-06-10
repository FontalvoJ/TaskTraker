import { Schema, model } from "mongoose";
import bycrypt from 'bcryptjs';


const institutionSchema = new Schema(
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
  }
);


institutionSchema.statics.encryptPassword = async(password) => {
  const salt = await bycrypt.genSalt(10)
  return await bycrypt.hash(password, salt)
}
institutionSchema.statics.comparePassword = async(password, receivedPassword) => {
  return await bycrypt.comparePassword(password, receivedPassword)
}


export default model('Institution',institutionSchema);