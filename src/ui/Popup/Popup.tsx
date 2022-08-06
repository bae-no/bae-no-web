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
  children?: ReactNode;
  confirmText: string;
  description: string;
  onCancel?: () => void;
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
  onCancel,
  buttonDirection = "row",
  open,
  onOpenChange,
}: PopupProps) => (
  <AlertDialog open={open} onOpenChange={onOpenChange}>
    {children && <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>}
    <AlertDialogContent>
      <Box gap={buttonDirection === "column" ? "32" : "24"}>
        <Box alignItems="center" gap="8">
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
          gap={buttonDirection === "column" ? "8" : undefined}
        >
          {cancelText && (
            <AlertDialogCancel asChild>
              <Button color="white" onClick={onCancel}>
                {cancelText}
              </Button>
            </AlertDialogCancel>
          )}
          <AlertDialogAction asChild>
            <Button type="submit" onClick={onConfirm}>
              {confirmText}
            </Button>
          </AlertDialogAction>
        </Box>
      </Box>
    </AlertDialogContent>
  </AlertDialog>
);

export default Popup;
