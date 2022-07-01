import { KeyboardEvent, ReactNode, useRef } from "react";

import {
  Content,
  Dialog,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  Overlay,
  Portal,
} from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

import { InferArray } from "src/types";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { overlayCss } from "../modalBase.css";
import { PullToClose } from "../PullToClose";
import { Typography } from "../Typography";

import { contentContainerCss, contentCss } from "./BottomDrawer.css";

const MotionOverlay = motion(Overlay);

interface SelectBottomDrawerProps {
  onOpenChange: (open: boolean) => void;
  onValueChange: (value: string) => void;
  open: boolean;
  options: Array<{ label: string; value: string }>;
  title?: string;
  trigger?: ReactNode;
  value?: string;
}

const SelectItem = ({
  label,
  value,
  onValueChange,
  currentValue,
}: InferArray<SelectBottomDrawerProps["options"]> &
  Pick<SelectBottomDrawerProps, "onValueChange"> & {
    currentValue?: string;
  }) => {
  const handleClick = () => {
    onValueChange(value);
  };
  const selected = value === currentValue;

  return (
    <DialogClose asChild>
      <Box
        aria-selected={selected}
        as="button"
        flexDirection="row"
        justifyContent="space-between"
        outline="none"
        px="md"
        py="xs"
        role="option"
        onClick={handleClick}
      >
        <Typography color={selected ? "orange2" : "black3"} fontSize="body1-m">
          {label}
        </Typography>
        {selected && <Icon color="orange2" name="check" size="lg" />}
      </Box>
    </DialogClose>
  );
};

const SelectBottomDrawer = ({
  title,
  onOpenChange,
  open,
  options,
  trigger,
  onValueChange,
  value: currentValue,
}: SelectBottomDrawerProps) => {
  const handleOpenChange = (_open: boolean) => {
    onOpenChange(_open);
  };

  const handleClose = () => {
    handleOpenChange(false);
  };

  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!listRef.current) return;

    const targetIndex = options.findIndex(
      ({ value }) => value === currentValue
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <AnimatePresence>
        {open && (
          <Portal forceMount>
            <MotionOverlay
              className={overlayCss}
              exit={{
                backgroundColor: "rgba(255, 255, 255, 0)",
              }}
            />
            <Content className={contentContainerCss}>
              <PullToClose className={contentCss} onClose={handleClose}>
                <>
                  <DialogTitle asChild>
                    <Typography as="h2" color="black1" fontSize="headline5">
                      {title}
                    </Typography>
                  </DialogTitle>
                  <Box ref={listRef} role="listbox" onKeyDown={handleKeyDown}>
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
              </PullToClose>
            </Content>
          </Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default SelectBottomDrawer;
