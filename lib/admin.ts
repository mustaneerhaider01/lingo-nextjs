import { auth } from "@clerk/nextjs/server";

const adminIds = ["user_2jPg6m0eaXDotUtmBATW9OEwoQ3"];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
