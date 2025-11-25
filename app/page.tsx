"use client";
import { NameSchemaType } from "@/lib/models/names";
import React from "react";

type receivedDataType = { name: string; _id: string; __v: number };

export default function SessionList() {
  const [sessionNames, setSessionName] = React.useState<string>("");
  const [receivedData, setReceivedData] = React.useState<receivedDataType>();

  async function addInputValue() {
    const respone = await fetch("/api/be", {
      method: "POST",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ sessionNames }),
    });
    const data = await respone.json();
    console.log(data.data, "alkjshdf");
    if (data) {
      setReceivedData(data.data);
    }
  }
  return (
    <div className="flex justify-center gap-100 items-center ">
      <div className="h-200">
        <input
          className="border-2"
          value={sessionNames}
          onChange={(event) => setSessionName(event.target.value)}
        />
        <button onClick={addInputValue}>Add</button>
      </div>
      <div className="w-fit h-200">{receivedData?.name}</div>
    </div>
  );
}
