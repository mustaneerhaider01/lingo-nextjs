import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import UserProgress from "@/components/user-progress";
import { Header } from "./components/header";
import {
  getCourseProgress,
  getLessonPercentage,
  getUnits,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Unit from "./components/unit";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";

const LearnPage = async () => {
  const [
    userProgress,
    units,
    courseProgress,
    lessonPercentage,
    userSubscription,
  ] = await Promise.all([
    getUserProgress(),
    getUnits(),
    getCourseProgress(),
    getLessonPercentage(),
    getUserSubscription(),
  ]);

  if (!courseProgress || !userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-12 px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={!!userSubscription?.isActive}
        />
        <Promo hasActiveSubscription={isPro} />
        <Quests points={userProgress.points} />
      </StickyWrapper>

      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />

        {units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              title={unit.title}
              description={unit.description}
              lessons={unit.lessons}
              activeLesson={courseProgress?.activeLesson}
              activeLessonPercentage={lessonPercentage}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
