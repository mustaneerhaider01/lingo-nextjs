import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { lessons } from "@/db/schema";

export async function GET(
  _: Request,
  { params }: { params: { lessonId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, Number(params.lessonId)),
  });

  return Response.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(lessons)
    .set({
      ...body,
    })
    .where(eq(lessons.id, Number(params.lessonId)))
    .returning();

  return Response.json(data[0]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { lessonId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(lessons)
    .where(eq(lessons.id, Number(params.lessonId)))
    .returning();

  return Response.json(data[0]);
}
