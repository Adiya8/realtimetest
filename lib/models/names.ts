import mongoose, { Schema } from "mongoose";
export type TaskSchemaType = {
  task: string;
};
const taskSchema = new Schema({
  task: String,
});

export const Task =
  mongoose.models.Task || mongoose.model<TaskSchemaType>("Task", taskSchema);
