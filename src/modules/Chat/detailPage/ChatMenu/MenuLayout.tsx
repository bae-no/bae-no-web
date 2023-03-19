import { createContext, ReactNode, useMemo } from "react";

import {
  Root,
  Trigger,
  Portal,
  Content,
  Overlay,
} from "@radix-ui/react-dialog";

import { useToggle } from "src/hooks/useToggle";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

import GuideModal from "../../GuideModal";

import { contentCss, overlayCss } from "./chatMenu.css";
import { Divider } from "./Divider";

interface GuideTriggerProps {
  toggleGuideModal: () => void;
}

const GuideTrigger = ({ toggleGuideModal }: GuideTriggerProps) => (
  <Box
    alignItems="center"
    cursor="pointer"
    flexDirection="row"
    justifyContent="space-between"
    py="24"
    width="full"
    onClick={toggleGuideModal}
  >
    <Typography fontSize="body2-b">공유딜 이용 가이드</Typography>
    <Icon name="arrow-right" size="12" />
  </Box>
);

export const MenuContext = createContext({
  isOpen: false,
  toggle: () => {},
});

interface ChatMenuProps {
  children: ReactNode;
}

export const ChatMenuLayout = ({ children }: ChatMenuProps) => {
  const [isOpen, toggle] = useToggle(false);
  const [isGuideModalOpen, toggleGuideModal] = useToggle(false);

  const contextProviderValue = useMemo(
    () => ({ isOpen, toggle }),
    [isOpen, toggle],
  );

  const handleGuideClose = () => {
    toggle();
    toggleGuideModal();
  };

  return (
    <Root open={isOpen}>
      <Trigger onClick={toggle}>
        <Box cursor="pointer">
          <Icon name="hamburger" />
        </Box>
      </Trigger>
      {!isGuideModalOpen ? (
        <Portal>
          <Overlay className={overlayCss({ isOpen })} onClick={toggle} />
          <Content className={contentCss({ isOpen })}>
            <Box px="16">
              <GuideTrigger toggleGuideModal={toggleGuideModal} />
              <Divider />
              <MenuContext.Provider value={contextProviderValue}>
                {children}
              </MenuContext.Provider>
            </Box>
          </Content>
        </Portal>
      ) : (
        <GuideModal
          defaultOpen
          closeCallback={handleGuideClose}
          trigger={null}
        />
      )}
    </Root>
  );
};
