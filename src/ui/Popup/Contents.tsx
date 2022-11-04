import {
  AlertDialogContentProps,
  Content,
  Overlay,
  Portal,
} from "@radix-ui/react-alert-dialog";

import { overlayCss } from "../modalBase.css";

import { popupContentCss } from "./Popup.css";

export const AlertDialogContent = ({
  children,
  ...props
}: AlertDialogContentProps) => (
  <Portal>
    <Overlay className={overlayCss} />
    <Content className={popupContentCss} {...props}>
      {children}
    </Content>
  </Portal>
);
