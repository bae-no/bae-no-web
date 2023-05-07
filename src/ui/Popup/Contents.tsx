import { Fragment } from "react";

import {
  AlertDialogContentProps,
  Content,
  Overlay,
  Portal,
} from "@radix-ui/react-alert-dialog";

import { useMounted } from "src/hooks/useMounted";

import { overlayCss } from "../modalBase.css";

import { popupContentCss } from "./Popup.css";

export const AlertDialogContent = ({
  children,
  ...props
}: AlertDialogContentProps) => {
  const mount = useMounted();
  const Container = mount ? Portal : Fragment;

  return (
    <Container>
      <Overlay className={overlayCss} />
      <Content className={popupContentCss} {...props}>
        {children}
      </Content>
    </Container>
  );
};
