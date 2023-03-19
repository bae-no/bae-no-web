import { reastorage } from "@reastorage/react";

import { CreateShareZoneInput } from "src/graphql";

type ShareZones = "chat" | "home";

export type RecentlySearchedShareZone = Omit<
  CreateShareZoneInput,
  "addressDetail"
>;

export const recentlySearchedShareZonesStorage = reastorage(
  "recent-share-zones",
  {} as Record<ShareZones, Array<RecentlySearchedShareZone> | undefined>,
  {
    actions: (prev) =>
      ({
        add: (key: ShareZones, value: RecentlySearchedShareZone) => {
          const isAlreadyExist = prev[key]?.find(
            (v) => v.addressPath === value.addressPath,
          );
          if (isAlreadyExist) return prev;
          return {
            ...prev,
            [key]: [value, ...(prev[key] ?? []).slice(0, 9)],
          };
        },
        remove(
          key: ShareZones,
          value: RecentlySearchedShareZone["addressPath"],
        ) {
          const removedTargetList = prev[key]?.filter(
            (item) => item.addressPath !== value,
          );

          return { ...prev, [key]: removedTargetList };
        },
      } as const),
  },
);
