import { reastorage } from "@reastorage/react";

import { UserAddressQuery } from "src/graphql";

type ShareZone = UserAddressQuery["addresses"][number];
type OptionalFields = "detail" | "alias" | "key";

export type RecentlySearchedShareZone = Omit<ShareZone, OptionalFields> &
  Partial<Pick<ShareZone, OptionalFields>>;

export const recentlySearchedShareZonesStorage = reastorage(
  "recent-share-zones",
  [] as Array<RecentlySearchedShareZone> | undefined,
  {
    actions: (prev) =>
      ({
        add: (value: RecentlySearchedShareZone) => {
          const isAlreadyExist = prev?.find((v) => v.path === value.path);
          if (isAlreadyExist) return prev;
          return [value, ...(prev ?? []).slice(0, 9)];
        },
        remove(value: RecentlySearchedShareZone["path"]) {
          const removedTargetList = prev?.filter((item) => item.path !== value);

          return removedTargetList;
        },
      } as const),
  },
);

export const currentShareZoneStorage = reastorage(
  "current-share-zone",
  {} as RecentlySearchedShareZone,
);
