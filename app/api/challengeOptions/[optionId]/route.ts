import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challengeOptions } from "@/db/schema";

export async function GET(
  _: Request,
  { params }: { params: { optionId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db.query.challengeOptions.findFirst({
    where: eq(challengeOptions.id, Number(params.optionId)),
  });

  return Response.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { optionId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challengeOptions)
    .set({
      ...body,
    })
    .where(eq(challengeOptions.id, Number(params.optionId)))
    .returning();

  return Response.json(data[0]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { optionId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(challengeOptions)
    .where(eq(challengeOptions.id, Number(params.optionId)))
    .returning();

  return Response.json(data[0]);
}
