import { reastorage } from "@reastorage/react";

import { UpdateShareDealInput } from "src/graphql";

export const updateShareDealStorage = reastorage(
  "updateShareDeal",
  {} as UpdateShareDealInput,
);
