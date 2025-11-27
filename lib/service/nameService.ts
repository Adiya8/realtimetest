import { Task, TaskSchemaType } from "../models/names";
import { getMongo } from "../mongodb";

export const getAllTask = async (): Promise<TaskSchemaType[]> => {
  await getMongo();
  const allTask: TaskSchemaType[] = await Task.find();
  return allTask;
};

export const createTask = async (task: string) => {
  try {
    await getMongo();
    const newTask = new Task({
      task,
    });
    await newTask.save();

    return newTask;
  } catch (error) {
    console.log("END ALDAA GARLAA", error);
  }
};
