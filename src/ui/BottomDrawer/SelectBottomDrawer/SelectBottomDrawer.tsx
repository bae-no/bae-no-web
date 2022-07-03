import { KeyboardEvent, useRef } from "react";

import {
  Content,
  Dialog,
  DialogTitle,
  DialogTrigger,
  Overlay,
  Portal,
} from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";

import { Box } from "../../Box";
import { overlayCss } from "../../modalBase.css";
import { PullToClose } from "../../PullToClose";
import { Typography } from "../../Typography";
import { contentContainerCss, contentCss } from "../BottomDrawer.css";

import { SelectBottomDrawerProps } from "./SelectBottomDrawer.types";
import { SelectItem } from "./SelectItem";

const MotionOverlay = motion(Overlay);

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
