import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startupId = searchParams.get("startupId");

  if (!startupId) {
    return NextResponse.json(
      { error: "Startup ID is required" },
      { status: 400 }
    );
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { startupId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { content, author, startupId } = await req.json();

    if (!content || !author || !startupId) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newComment = await prisma.comment.create({
      data: { content, author, startupId },
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
