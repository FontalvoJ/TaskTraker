import { Schema, model } from "mongoose";

const projectSchema = new Schema(
  {
    title: String,
    category: String,
    description: String,
    objective: String,
    id_teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher", 
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Project = model("Project", projectSchema);

export default Project;
