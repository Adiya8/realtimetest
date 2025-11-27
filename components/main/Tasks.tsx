"use client";
import { useState } from "react";

import { nanoid } from "nanoid";
import { useTasks } from "@/hooks/useTasks";
import { channel } from "@/lib/ablyClient";

export const Tasks = () => {
  const tasks = useTasks();
  const [input, setInput] = useState("");

  const addTask = async () => {
    if (!input.trim()) return;
    const root = await channel.objects.getRoot();
    const tasksMap = root.get("tasks")!;
    const id = nanoid();
    await tasksMap.set(id, input.trim());
    setInput("");
  };

  const editTask = async (id: string) => {
    const newTitle = prompt("Edit task");
    if (!newTitle) return;
    const root = await channel.objects.getRoot();
    const tasksMap = root.get("tasks")!;
    await tasksMap.set(id, newTitle);
  };

  const removeTask = async (id: string) => {
    const root = await channel.objects.getRoot();
    const tasksMap = root.get("tasks")!;
    await tasksMap.remove(id);
  };

  return (
    <div className="tasks-container">
      <h1>Realtime Tasks</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTask}>Add</button>

      <ul>
        {tasks &&
          Array.from(tasks.entries()).map(([id, title]) => (
            <li key={id}>
              {title as string}{" "}
              <button onClick={() => editTask(id)}>Edit</button>{" "}
              <button onClick={() => removeTask(id)}>Remove</button>
            </li>
          ))}
      </ul>
    </div>
  );
};
