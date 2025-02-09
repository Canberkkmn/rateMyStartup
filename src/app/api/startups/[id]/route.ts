import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const startup = await prisma.startup.findUnique({
      where: { id: params.id },
    });

    if (!startup) {
      return NextResponse.json({ error: "Startup not found" }, { status: 404 });
    }

    return NextResponse.json(startup);
  } catch (error) {
    console.error("Error fetching startup:", error);
    return NextResponse.json(
      { error: "Failed to fetch startup" },
      { status: 500 }
    );
  }
}
