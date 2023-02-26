import { reastorage } from "@reastorage/react";

type RecentlySearch = string[];

export const recentlySearch = reastorage<RecentlySearch, any>(
  "recentlySearchList",
  [],
  {
    actions: (prev) => ({
      add: (value: string) => {
        if (!value) return prev;
        return [value, ...prev.filter((item) => item !== value)];
      },
      remove: (value: string) => {
        const removedTargetList = prev.filter((item) => item !== value);

        return removedTargetList;
      },
    }),
  },
);
