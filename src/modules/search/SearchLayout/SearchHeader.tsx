import { FormEvent, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import { recentlySearch } from "src/store/recentlySearch";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";

const SEARCH_DETAIL_URL = "/search/detail";
const SEARCH_DETAIL_RECENT_URL = "/search/recent";

export const SearchHeader = () => {
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
    recentlySearch.actions.add(value);
    router.push({
      pathname: SEARCH_DETAIL_URL,
      query: {
        keyword: value,
      },
    });
    ref.current?.blur();
  };

  const handleNextPage = () => {
    const { pathname } = router;
    if (pathname === SEARCH_DETAIL_RECENT_URL) return;
    if (pathname === SEARCH_DETAIL_URL) {
      router.back();

      return;
    }
    router.push({
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
