import { reastorage } from "@reastorage/react";

type RecentlySearch = { id: number; value: string }[];

export const recentlySearch = reastorage<RecentlySearch, any>(
  "recentlySearchList",
  [],
);
