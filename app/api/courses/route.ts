import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { isAdmin } from "@/lib/admin";

export async function GET() {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db.query.courses.findMany();

  return Response.json(data);
}

export async function POST(req: Request) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .insert(courses)
    .values({
      ...body,
    })
    .returning();

  return Response.json(data[0]);
}
