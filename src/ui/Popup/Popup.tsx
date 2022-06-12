import { ReactNode } from "react";

import {
  Portal,
  Overlay,
  Content,
  AlertDialogContentProps,
  AlertDialog,
  AlertDialogProps,
  AlertDialogTrigger,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";

import { Box } from "../Box";
import { Button } from "../Button";
import { overlayCss } from "../modalBase.css";
import { Typography } from "../Typography";

import { popupContentCss } from "./Popup.css";

const AlertDialogContent = ({
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

interface PopupProps extends Pick<AlertDialogProps, "open" | "onOpenChange"> {
  buttonDirection?: "row" | "column";
  cancelText?: string;
  children: ReactNode;
  confirmText: string;
  description: string;
  onConfirm?: () => void;
  title: string;
}

const Popup = ({
  children,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  buttonDirection = "row",
  open,
  onOpenChange,
}: PopupProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
    <AlertDialogContent>
      <Box gap={buttonDirection === "column" ? "xl" : "lg"}>
        <Box alignItems="center" gap="xs">
          <AlertDialogTitle asChild>
            <Typography as="h2" fontSize="headline4">
              {title}
            </Typography>
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <Typography color="black3" fontSize="body1-m">
              {description}
            </Typography>
          </AlertDialogDescription>
        </Box>
        <Box
          flexDirection={
            buttonDirection === "column" ? "column-reverse" : "row"
          }
          gap={buttonDirection === "column" ? "xs" : undefined}
        >
          {cancelText && (
            <AlertDialogCancel asChild>
              <Button color="white">{cancelText}</Button>
            </AlertDialogCancel>
          )}
          <AlertDialogAction asChild>
            <Button onClick={onConfirm}>{confirmText}</Button>
          </AlertDialogAction>
        </Box>
      </Box>
    </AlertDialogContent>
  </AlertDialog>
);

export default Popup;
