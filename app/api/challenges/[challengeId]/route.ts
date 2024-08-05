import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { challenges } from "@/db/schema";

export async function GET(
  _: Request,
  { params }: { params: { challengeId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db.query.challenges.findFirst({
    where: eq(challenges.id, Number(params.challengeId)),
  });

  return Response.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { challengeId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(challenges)
    .set({
      ...body,
    })
    .where(eq(challenges.id, Number(params.challengeId)))
    .returning();

  return Response.json(data[0]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { challengeId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(challenges)
    .where(eq(challenges.id, Number(params.challengeId)))
    .returning();

  return Response.json(data[0]);
}
