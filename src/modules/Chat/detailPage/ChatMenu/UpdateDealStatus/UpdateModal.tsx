import { ReactNode } from "react";

import {
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from "@radix-ui/react-dialog";

import { useToggle } from "src/hooks/useToggle";
import { Box } from "src/ui/Box";
import { Button } from "src/ui/Button";
import { Typography } from "src/ui/Typography";

import { updateDealStatus } from "./updateDeal.css";

interface UpdateModalProps {
  children: ReactNode;
  confirmBtn: ReactNode;
  description: string;
  isActive?: boolean;
  title: string;
}

export const UpdateModal = ({
  children,
  title,
  description,
  confirmBtn,
  isActive,
}: UpdateModalProps) => {
  const [open, toggle] = useToggle();

  return (
    <Root open={Boolean(isActive && open)} onOpenChange={toggle}>
      <Trigger>{children}</Trigger>
      <Portal>
        <Overlay className={updateDealStatus.overlay} />
        <Content className={updateDealStatus.content}>
          <Box
            alignItems="center"
            backgroundColor="white"
            borderRadius="12"
            gap="8"
            padding="24"
            textAlign="center"
          >
            <Title>
              <Typography fontSize="headline4">{title}</Typography>
            </Title>
            <Description>
              <Typography color="black3" fontSize="body1-m">
                {description}
              </Typography>
            </Description>
            <Box flexDirection="row" gap="16" width="full">
              <Button color="white" onClick={toggle}>
                취소
              </Button>
              {confirmBtn}
            </Box>
          </Box>
        </Content>
      </Portal>
    </Root>
  );
};
