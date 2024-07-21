import { lessons, units } from "@/db/schema";
import UnitBanner from "./unit-banner";

type Props = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
  activeLesson?: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  };
  activeLessonPercentage: number;
};

const Unit = ({
  id,
  title,
  description,
  order,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
    </>
  );
};

export default Unit;
