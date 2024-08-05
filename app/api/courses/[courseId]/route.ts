import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { courses } from "@/db/schema";

export async function GET(
  _: Request,
  { params }: { params: { courseId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db.query.courses.findFirst({
    where: eq(courses.id, Number(params.courseId)),
  });

  return Response.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(courses)
    .set({
      ...body,
    })
    .where(eq(courses.id, Number(params.courseId)))
    .returning();

  return Response.json(data[0]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { courseId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(courses)
    .where(eq(courses.id, Number(params.courseId)))
    .returning();

  return Response.json(data[0]);
}
