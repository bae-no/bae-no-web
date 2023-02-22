import { FormEvent, useEffect, useRef } from "react";

import { useSetReastorage } from "@reastorage/react";
import { useRouter } from "next/router";

import { recentlySearch } from "src/store/recentlySearch";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";

const SEARCH_DETAIL_URL = "/search-detail";
const SEARCH_DETAIL_RECENT_URL = "/search-detail/recent";

export const SearchHeader = () => {
  const setRecentlySearchList = useSetReastorage(recentlySearch);
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { keyword } = router.query as { [key: string]: string };

  useEffect(() => {
    if (!ref.current) return;
    ref.current.value = keyword ?? "";
  }, [keyword]);

  const handleInputClear = () => {
    if (!ref.current) return;
    ref.current.value = "";
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const value = ref.current?.value;
    setRecentlySearchList((prev) => {
      if (!value) return prev;
      return [value, ...prev.filter((item) => item !== value)];
    });
    router.replace({
      pathname: SEARCH_DETAIL_URL,
      query: {
        keyword: value,
      },
    });
    ref.current?.blur();
  };

  const handleBackIconClick = () => {
    router.back();
  };

  const handleNextPage = () => {
    if (router.pathname === SEARCH_DETAIL_RECENT_URL) return;
    router[keyword ? "replace" : "push"]({
      pathname: SEARCH_DETAIL_RECENT_URL,
    });
  };

  return (
    <Box
      alignItems="center"
      as="form"
      flexDirection="row"
      gap="8"
      width="full"
      onSubmit={handleSubmit}
    >
      <Box cursor="pointer" onClick={handleBackIconClick}>
        <Icon name="arrow-left" />
      </Box>
      <Box width="full">
        <Input
          autoFocus={router.pathname === SEARCH_DETAIL_RECENT_URL}
          leftNode={<Icon name="search-outline" />}
          placeholder="공유할 배달 음식을 찾아보세요."
          ref={ref}
          onClearClick={handleInputClear}
          onClick={handleNextPage}
        />
      </Box>
    </Box>
  );
};
