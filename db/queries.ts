import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import db from "./drizzle";
import { courses, userProgress } from "./schema";

export const getUserProgress = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.userProgress.findFirst({
    where: eq(userProgress.userId, userId),
    with: {
      activeCourse: true,
    },
  });

  return data;
});

export const getCourses = cache(async () => {
  const courses = await db.query.courses.findMany();

  return courses;
});

export const getCourseById = cache(async (courseId: number) => {
  const course = await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    // TODO: Populate units and lessons...
  });

  return course;
});
