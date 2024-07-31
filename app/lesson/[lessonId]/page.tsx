import { redirect } from "next/navigation";

import { getLesson, getUserProgress } from "@/db/queries";
import Quiz from "../components/quiz";

type PageProps = {
  params: {
    lessonId: string;
  };
};

const PracticeLessonPage = async ({ params: { lessonId } }: PageProps) => {
  const [lesson, userProgress] = await Promise.all([
    getLesson(Number(lessonId)),
    getUserProgress(),
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  );

  const initialPercentage = Math.round(
    (completedChallenges.length / lesson.challenges.length) * 100
  );

  return (
    <Quiz
      initialLessonId={lesson.id}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={null} // TODO: Add user subscription...
    />
  );
};

export default PracticeLessonPage;
