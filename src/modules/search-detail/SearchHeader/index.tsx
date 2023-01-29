import { Dispatch, FormEvent, SetStateAction, useRef } from "react";

import { useSetReastorage } from "@reastorage/react";

import { recentlySearch } from "src/store/recentlySearch";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";

interface SearchHeaderProps {
  inputFocus: boolean;
  setInputFocus: Dispatch<SetStateAction<boolean>>;
}

export const SearchHeader = ({
  inputFocus,
  setInputFocus,
}: SearchHeaderProps) => {
  const setRecentlySearchList = useSetReastorage(recentlySearch);
  const ref = useRef<HTMLInputElement>(null);

  const handleInputClear = () => {
    if (!ref.current) return;
    ref.current.value = "";
  };

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const value = ref.current?.value;
    if (!value) return;

    const id = Math.round(Math.random() * 1000000);
    setRecentlySearchList((prev) => [...prev, { id, value }]);
    handleInputClear();
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
      {inputFocus && (
        <Box cursor="pointer" onClick={() => setInputFocus(false)}>
          <Icon name="arrow-left" />
        </Box>
      )}
      <Box width="full">
        <Input
          leftNode={<Icon name="search-outline" />}
          placeholder="공유할 배달 음식을 찾아보세요."
          ref={ref}
          onClearClick={handleInputClear}
          onFocus={() => setInputFocus(true)}
        />
      </Box>
    </Box>
  );
};
