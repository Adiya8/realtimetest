import { createTask, getAllTask } from "@/lib/service/nameService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const result = await getAllTask();
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { task } = body;
    console.log("Received session name:", task);

    const result = await createTask(task);

    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/be:", error);
    return NextResponse.json({ message: "aldaa garlaa" }), { status: 500 };
  }
}
