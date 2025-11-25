import mongoose, { Schema } from "mongoose";
export type NameSchemaType = {
  name: string;
};
const nameSchema = new Schema({
  name: { type: String, required: true },
});

export const Name =
  mongoose.models.Name || mongoose.model<NameSchemaType>("Name", nameSchema);
