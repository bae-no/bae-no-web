import { useEffect, useState } from "react";

import Image from "next/image";

import { FoodCategory } from "src/graphql";
import { Box } from "src/ui/Box";
import ShuffleIcon from "src/ui/Icon/svgs/shuffle.svg";

export const getRandomIndex = () => Math.floor(Math.random() * 3) + 1;

interface ThumnailProps {
  category?: FoodCategory;
  setThumbnailUrl: (url: string) => void;
  thumbnailUrl: string;
}

const Thumnail = ({
  category,
  setThumbnailUrl,
  thumbnailUrl,
}: ThumnailProps) => {
  const [randomIndex, setRandomIndex] = useState(getRandomIndex);

  const handleClick = () => {
    let newRandomIndex = getRandomIndex();
    while (newRandomIndex === randomIndex) {
      newRandomIndex = getRandomIndex();
    }
    setRandomIndex(newRandomIndex);
  };

  useEffect(() => {
    setThumbnailUrl(
      `/images/food/${category
        ?.toLocaleLowerCase()
        .replace("_", "")}${randomIndex}.png`,
    );
  }, [setThumbnailUrl, category, randomIndex]);
  return (
    <>
      <Box style={{ paddingTop: "100%" }} top="0" width="full">
        <Image fill alt="test" src={thumbnailUrl} />
      </Box>
      <Box
        as="button"
        backgroundColor="white"
        bottom="16"
        boxShadow="overlay"
        br="half"
        p="12"
        position="absolute"
        right="16"
        type="button"
        onClick={handleClick}
      >
        <ShuffleIcon />
      </Box>
    </>
  );
};

export default Thumnail;
