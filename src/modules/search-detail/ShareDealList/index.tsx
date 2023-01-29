import { useEffect } from "react";

import {
  AddressSystem,
  FoodCategory,
  useInfiniteGetShareDealList,
  useOpenShareDeal,
} from "src/graphql";
import { Button } from "src/ui/Button";

export const ShareDealList = () => {
  const a = "a";
  const { data, isError } = useInfiniteGetShareDealList(
    "input",
    {
      input: {
        page: 1,
        size: 10,
      },
    },
    {
      suspense: false,
    },
  );

  const { mutate, isLoading } = useOpenShareDeal();
  const handleMutate = () => {
    mutate({
      input: {
        category: FoodCategory.Chicken,
        maxParticipant: 3,
        orderPrice: 10000,
        shareZone: {
          addressDetail: "testDetail",
          addressPath: "testPath",
          addressSystem: AddressSystem.Road,
          latitude: 30,
          longitude: 30,
        },
        storeName: "테스트공유딜",
        thumbnail: "testThumbnail",
        title: "테스트공유딜",
      },
    });
  };
  console.log(data, isError);

  return (
    <div>
      <Button
        onClick={() => {
          handleMutate();
        }}
      >
        testtest
      </Button>
    </div>
  );
};
