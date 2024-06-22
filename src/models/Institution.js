import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const institutionSchema = new Schema(
  {
    institutionName: {
      type: String,
      required: true,
    },
    nit: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    contact: {
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

institutionSchema.statics.encryptPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

institutionSchema.statics.comparePassword = async function(password, receivedPassword) {
  return await bcrypt.compare(password, receivedPassword);
};

export default model('Institution', institutionSchema);
