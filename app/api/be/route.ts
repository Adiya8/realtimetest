import { NextRequest, NextResponse } from "next/server";
const { db } = await getMongo();
const col = db.collection("tasks");

import { getMongo } from "@/lib/mongodb";

export async function GET() {
  try {
    const { db } = await getMongo();
    const col = db.collection("tasks");

    const docs = await col
      .find({}, { projection: { _id: 0, task: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ data: docs.map((d) => d.task) });
  } catch (err) {
    console.error("GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const task = body?.task;

    if (!task || typeof task !== "string") {
      return NextResponse.json({ error: "Invalid task" }, { status: 400 });
    }

    const { db } = await getMongo();
    const col = db.collection("tasks");

    await col.insertOne({ task, createdAt: new Date() });

    const docs = await col
      .find({}, { projection: { _id: 0, task: 1 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ data: docs.map((d) => d.task) });
  } catch (err) {
    console.error("POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
