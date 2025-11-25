import { Name, NameSchemaType } from "../models/names";
import { connectDB } from "../mongodb";

export const getAllName = async (): Promise<NameSchemaType[]> => {
  await connectDB();
  const allName: NameSchemaType[] = await Name.find();
  return allName;
};

export const createName = async (name: string) => {
  try {
    await connectDB();
    const newName = new Name({
      name,
    });
    await newName.save();

    return newName;
  } catch (error) {
    console.log("END ALDAA GARLAA", error);
  }
};
