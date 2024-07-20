"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { courses } from "@/db/schema";
import { Card } from "./card";
import { upsertUserProgress } from "@/actions/user-progress";

type Props = {
  courses: (typeof courses.$inferSelect)[];
  activeCourseId?: number | null;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleClick = (courseId: number) => {
    if (pending) return;

    if (courseId === activeCourseId) {
      router.push("/learn");
      return;
    }

    startTransition(() => {
      upsertUserProgress(courseId).catch((err) => {
        toast.error(err.message || "Something went wrong");
      });
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={handleClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
