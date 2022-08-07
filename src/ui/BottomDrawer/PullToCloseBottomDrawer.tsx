import { ReactNode } from "react";

import {
  Content,
  Dialog,
  DialogProps,
  DialogTrigger,
  Overlay,
  Portal,
} from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "framer-motion";

import { overlayCss } from "../modalBase.css";
import { PullToClose } from "../PullToClose";

import { contentContainerCss, contentCss } from "./BottomDrawer.css";

const MotionOverlay = m(Overlay);

export interface PullToCloseBottomDrawerProps
  extends Required<Pick<DialogProps, "open" | "onOpenChange">> {
  children: ReactNode;
  trigger?: ReactNode;
}

const PullToCloseBottomDrawer = ({
  children,
  onOpenChange,
  open,
  trigger,
}: PullToCloseBottomDrawerProps) => {
  const handleClose = () => {
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
                {children}
              </PullToClose>
            </Content>
          </Portal>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default PullToCloseBottomDrawer;
