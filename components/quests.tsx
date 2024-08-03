import Image from "next/image";
import Link from "next/link";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { questsData } from "@/data";

type Props = {
  points: number;
};

export const Quests = ({ points }: Props) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between w-full space-x-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Button variant="primaryOutline" size="sm" asChild>
          <Link href="/quests">View all</Link>
        </Button>
      </div>
      <ul className="w-full space-y-4">
        {questsData.map((quest) => {
          const progress = (points / quest.value) * 100;

          return (
            <div
              key={quest.title}
              className="flex items-center w-full pb-4 gap-x-3"
            >
              <Image src="/points.svg" alt="Points" height={40} width={40} />
              <div className="w-full flex flex-col gap-y-2">
                <p className="text-neutral-700 text-sm font-bold">
                  {quest.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
