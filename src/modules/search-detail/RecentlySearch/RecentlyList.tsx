import { MouseEvent } from "react";

import { useReastorage } from "@reastorage/react";
import { useRouter } from "next/router";

import { recentlySearch } from "src/store/recentlySearch";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

const SEARCH_DETAIL_URL = "/search-detail";

export const RecentlyList = () => {
  const router = useRouter();
  const [recentlySearchList, setRecentlySearchList] =
    useReastorage(recentlySearch);

  const handleDelete = (
    e: MouseEvent<HTMLElement, globalThis.MouseEvent>,
    value: string,
  ) => {
    e.stopPropagation();
    const removedTargetList = recentlySearchList.filter(
      (item) => item !== value,
    );
    setRecentlySearchList(removedTargetList);
  };

  const handleRowClick = (value: string) => {
    router
      .replace({
        pathname: SEARCH_DETAIL_URL,
        query: {
          keyword: value,
        },
      })
      .then(() => {
        setRecentlySearchList((prev) => [
          value,
          ...prev.filter((item) => item !== value),
        ]);
      });
  };

  return (
    <Box as="ul" gap="16">
      {recentlySearchList?.map((item) => (
        <Box
          as="li"
          cursor="pointer"
          flexDirection="row"
          justifyContent="space-between"
          key={item}
          onClick={() => handleRowClick(item)}
        >
          <Typography color="black2" fontSize="body1-m">
            {item}
          </Typography>
          <Box as="button" onClickCapture={(e) => handleDelete(e, item)}>
            <Icon color="black7" name="close-typing" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
