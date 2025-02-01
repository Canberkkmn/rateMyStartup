import { NextResponse } from "next/server";

let startups = [
  {
    id: "1",
    name: "TechX",
    description: "AI-powered technology startup.",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Innovate AI",
    description: "AI solutions for enterprises.",
    rating: 4.5,
  },
  {
    id: "3",
    name: "GreenFuture",
    description: "Sustainable energy solutions.",
    rating: 4.2,
  },
];

export async function GET() {
  return NextResponse.json(startups);
}

// POST /api/startups - Yeni startup ekle
export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();
    
    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required." },
        { status: 400 }
      );
    }

    const newStartup = {
      id: (startups.length + 1).toString(),
      name,
      description,
      rating: 0,
    };

    startups.push(newStartup);

    return NextResponse.json(newStartup, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create startup." },
      { status: 500 }
    );
  }
}
