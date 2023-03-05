import { atom } from "jotai";

import { FoodCategory } from "src/graphql";

type CreateChatForm = {
  category: FoodCategory;
  maxParticipant: number;
  orderPrice: number;
  storeName: string;
  title: string;
};

export const createChatFormAtom = atom<Partial<CreateChatForm>>({});
