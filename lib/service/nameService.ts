import { Task, TaskSchemaType } from "../models/names";
import { connectDB } from "../mongodb";

export const getAllTask = async (): Promise<TaskSchemaType[]> => {
  await connectDB();
  const allTask: TaskSchemaType[] = await Task.find();
  return allTask;
};

export const createTask = async (task: string) => {
  try {
    await connectDB();
    const newTask = new Task({
      task,
    });
    await newTask.save();

    return newTask;
  } catch (error) {
    console.log("END ALDAA GARLAA", error);
  }
};
