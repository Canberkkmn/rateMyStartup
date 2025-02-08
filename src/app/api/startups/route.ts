import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const startups = await prisma.startup.findMany();

    return NextResponse.json(startups);
  } catch (error) {
    console.error("Error fetching startups:", error);

    return NextResponse.json(
      { error: "Failed to fetch startups" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required." },
        { status: 400 }
      );
    }

    const newStartup = await prisma.startup.create({
      data: { name, description },
    });

    return NextResponse.json(newStartup, { status: 201 });
  } catch (error) {
    console.error("Error creating startup:", error);

    return NextResponse.json(
      { error: "Failed to create startup" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, rating } = await req.json();

    if (!id || !rating) {
      return NextResponse.json(
        { error: "ID and rating are required." },
        { status: 400 }
      );
    }

    const startup = await prisma.startup.findUnique({ where: { id } });

    if (!startup) {
      return NextResponse.json(
        { error: "Startup not found." },
        { status: 404 }
      );
    }

    const newRating =
      (startup.rating * startup.votes + rating) / (startup.votes + 1);
    const updatedStartup = await prisma.startup.update({
      where: { id },
      data: { rating: newRating, votes: startup.votes + 1 },
    });

    return NextResponse.json(updatedStartup);
  } catch (error) {
    console.error("Error updating rating:", error);

    return NextResponse.json(
      { error: "Failed to update rating" },
      { status: 500 }
    );
  }
}
