"use client";

import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { MAX_HEARTS, POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();

  const onRefillHearts = () => {
    if (pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) return;

    startTransition(() => {
      refillHearts().catch((err) =>
        toast.error(err.message || "Something went wrong. Please try again.")
      );
    });
  };

  return (
    <ul className="w-full">
      <li className="p-4 border-t-2 w-full">
        <div className="flex items-center gap-x-4">
          <Image src="/heart.svg" alt="Heart" height={60} width={60} />
          <div className="flex-1">
            <p className="text-neutral-700 font-bold text-base lg:text-xl">
              Refill hearts
            </p>
          </div>
          <Button
            onClick={onRefillHearts}
            disabled={
              pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
            }
          >
            {hearts === MAX_HEARTS ? (
              "full"
            ) : (
              <div className="flex items-center">
                <Image src="/points.svg" alt="Points" height={20} width={20} />
                <p>{POINTS_TO_REFILL}</p>
              </div>
            )}
          </Button>
        </div>
      </li>
    </ul>
  );
};

export default Items;
