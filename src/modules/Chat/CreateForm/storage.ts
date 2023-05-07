import { reastorage } from "@reastorage/react";

import { CreateShareZoneInput, FoodCategory } from "src/graphql";

export type CreateChatForm = {
  category: FoodCategory;
  maxParticipants: number;
  orderPrice: number;
  shareZone: CreateShareZoneInput;
  storeName: string;
  title: string;
};

export const createChatFormStorage = reastorage(
  "create-chat",
  {} as CreateChatForm,
  {
    actions: (prev) => ({
      setShareZone: (shareZone: Partial<CreateShareZoneInput>) => ({
        ...prev,
        shareZone: {
          ...prev.shareZone,
          ...shareZone,
        },
      }),
    }),
  },
);
