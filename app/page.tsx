"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function TaskBoard() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const removeAll = () => setTasks([]);

  async function addTask() {
    if (!input.trim()) return;

    const response = await fetch("/api/be", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: input }),
    });

    const data = await response.json();

    if (Array.isArray(data?.data)) {
      setTasks(data.data);
    } else {
      setTasks((prev) => [...prev, input]);
    }

    setInput("");
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4 font-inter">
      <div className="w-full max-w-xl flex flex-col space-y-4">
        <h2 className="text-sm font-bold text-center mb-4">
          Realtime Task Board
        </h2>

        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task"
            className="h-8"
          />
          <Button onClick={addTask} className="rounded-full px-4">
            Add
          </Button>
          <Button
            variant="outline"
            onClick={removeAll}
            className="rounded-full px-4"
          >
            Remove all
          </Button>
        </div>

        <Card className="h-[400px] overflow-y-auto shadow-lg">
          <CardContent className="p-4 space-y-4">
            {tasks.map((t, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border bg-white shadow-sm text-sm"
              >
                {t}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
