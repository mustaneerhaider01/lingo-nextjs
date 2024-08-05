import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import { isAdmin } from "@/lib/admin";
import { units } from "@/db/schema";

export async function GET(
  _: Request,
  { params }: { params: { unitId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db.query.units.findFirst({
    where: eq(units.id, Number(params.unitId)),
  });

  return Response.json(data);
}

export async function PUT(
  req: Request,
  { params }: { params: { unitId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const data = await db
    .update(units)
    .set({
      ...body,
    })
    .where(eq(units.id, Number(params.unitId)))
    .returning();

  return Response.json(data[0]);
}

export async function DELETE(
  _: Request,
  { params }: { params: { unitId: string } }
) {
  if (!isAdmin()) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db
    .delete(units)
    .where(eq(units.id, Number(params.unitId)))
    .returning();

  return Response.json(data[0]);
}
