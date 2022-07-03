import { ReactNode } from "react";

import {
  Dialog,
  Content,
  DialogTrigger,
  Portal,
  Overlay,
  DialogProps,
} from "@radix-ui/react-dialog";

import { overlayCss } from "../modalBase.css";

import {
  contentAnimationCss,
  contentContainerCss,
  contentCss,
} from "./BottomDrawer.css";

export interface BottomDrawerProps
  extends Pick<DialogProps, "open" | "onOpenChange"> {
  children: ReactNode;
  trigger?: ReactNode;
}

const BottomDrawer = ({
  children,
  trigger,
  open,
  onOpenChange,
}: BottomDrawerProps) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
    <Portal>
      <Overlay className={overlayCss} />
      <Content
        className={`${contentContainerCss} ${contentCss} ${contentAnimationCss}`}
      >
        {children}
      </Content>
    </Portal>
  </Dialog>
);

export default BottomDrawer;
