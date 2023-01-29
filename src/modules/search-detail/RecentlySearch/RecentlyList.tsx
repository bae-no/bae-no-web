import { useReastorage } from "@reastorage/react";

import { recentlySearch } from "src/store/recentlySearch";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

export const RecentlyList = () => {
  const [recentlySearchList, setRecentlySearchList] =
    useReastorage(recentlySearch);
  const handleDelete = (id: number) => {
    const removedTargetList = recentlySearchList.filter(
      (item) => item.id !== id,
    );
    setRecentlySearchList(removedTargetList);
  };

  return (
    <Box as="ul" gap="16">
      {recentlySearchList?.map((item) => (
        <Box
          as="li"
          flexDirection="row"
          justifyContent="space-between"
          key={item.id}
        >
          <Typography color="black2" fontSize="body1-m">
            {item.value}
          </Typography>
          <Box as="button" onClick={() => handleDelete(item.id)}>
            <Icon color="black7" name="close-typing" />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
