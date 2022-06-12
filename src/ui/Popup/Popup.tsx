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
import { ReactNode } from "react";
import { Box } from "../Box";

import { Button } from "../Button";
import { Typography } from "../Typography";
import { contentCss, overlayCss } from "./Popup.css";

function AlertDialogContent({ children, ...props }: AlertDialogContentProps) {
  return (
    <Portal>
      <Overlay className={overlayCss} />
      <Content className={contentCss} {...props}>
        {children}
      </Content>
    </Portal>
  );
}

interface PopupProps extends Pick<AlertDialogProps, "open" | "onOpenChange"> {
  children: ReactNode;
  title: string;
  description: string;
  cancelText?: string;
  confirmText: string;
  onConfirm?: () => void;
  buttonDirection?: "row" | "column";
}

export default function Popup({
  children,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  buttonDirection = "row",
  open,
  onOpenChange,
}: PopupProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <Box gap={buttonDirection === "column" ? "xl" : "lg"}>
          <Box gap="xs" alignItems="center">
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
            gap={buttonDirection === "column" ? "xs" : undefined}
            flexDirection={
              buttonDirection === "column" ? "column-reverse" : "row"
            }
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
}
