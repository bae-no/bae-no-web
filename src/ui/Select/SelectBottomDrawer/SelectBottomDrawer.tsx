import { KeyboardEvent, useRef } from "react";

import { DialogTitle } from "@radix-ui/react-dialog";

import { PullToCloseBottomDrawer } from "src/ui/BottomDrawer";

import { Box } from "../../Box";
import { Typography } from "../../Typography";

import { selectBodyCss } from "./SelectBottomDrawer.css";
import { SelectBottomDrawerProps } from "./SelectBottomDrawer.types";
import { SelectItem } from "./SelectItem";

const SelectBottomDrawer = ({
  title,
  onOpenChange,
  open,
  options,
  trigger,
  onValueChange,
  value: currentValue,
}: SelectBottomDrawerProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!listRef.current) return;

    const targetIndex = options.findIndex(
      ({ value }) => value === currentValue,
    );
    if (e.key === "ArrowUp") {
      if (targetIndex === 0) return;
      onValueChange(options[targetIndex - 1].value);
      (listRef.current.children[targetIndex - 1] as HTMLButtonElement).focus();
    } else if (e.key === "ArrowDown") {
      if (targetIndex === options.length - 1) return;
      onValueChange(options[targetIndex + 1].value);
      (listRef.current.children[targetIndex + 1] as HTMLButtonElement).focus();
    }
  };

  return (
    <PullToCloseBottomDrawer
      open={open}
      trigger={trigger}
      onOpenChange={onOpenChange}
    >
      <>
        <DialogTitle asChild>
          <Typography as="h2" color="black1" fontSize="headline5">
            {title}
          </Typography>
        </DialogTitle>
        <Box
          className={selectBodyCss}
          ref={listRef}
          role="listbox"
          onKeyDown={handleKeyDown}
        >
          {options.map(({ label, value }) => (
            <SelectItem
              currentValue={currentValue}
              key={value}
              label={label}
              value={value}
              onValueChange={onValueChange}
            />
          ))}
        </Box>
      </>
    </PullToCloseBottomDrawer>
  );
};

export default SelectBottomDrawer;
