import { reastorage } from "@reastorage/react";

type RecentlySearch = string[];

export const recentlySearch = reastorage<RecentlySearch, any>(
  "recentlySearchList",
  [],
);
