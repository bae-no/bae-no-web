import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";

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

import GuideModal from "../../GuideModal";

import {
  contentCss,
  overlayCss,
  contentBaseCss,
  overlayBaseCss,
} from "./chatMenu.css";

interface MenuLayoutContextType {
  animationOn: boolean;
  isSideMenuOpen: boolean;
  setAnimationOn: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  toggleGuide: () => void;
}

export const MenuLayoutContext = createContext<MenuLayoutContextType>({
  animationOn: true,
  isSideMenuOpen: false,
  setAnimationOn: () => {},
  setOpen: () => {},
  toggleGuide: () => {},
});

interface ChatMenuProps {
  children: ReactNode;
}

export const ChatMenuLayout = ({ children }: ChatMenuProps) => {
  const [isOpen, setOpen] = useState(false);
  const [animationOn, setAnimationOn] = useState(true);
  const [isGuideOpen, toggleGuide] = useToggle(false);

  const menuLayoutContextValue = useMemo(
    () => ({
      animationOn,
      isSideMenuOpen: isOpen,
      setAnimationOn,
      setOpen,
      toggleGuide,
    }),
    [animationOn, isOpen, toggleGuide],
  );

  const handleGuideCloseCallback = () => {
    setAnimationOn(true);
    toggleGuide();
    setOpen(true);
  };

  return (
    <Root open={isOpen}>
      <Trigger onClick={() => setOpen(true)}>
        <Box cursor="pointer">
          <Icon name="hamburger" />
        </Box>
      </Trigger>
      {!isGuideOpen ? (
        <Portal>
          <Overlay
            className={
              menuLayoutContextValue.animationOn
                ? overlayCss({
                    isOpen,
                  })
                : overlayBaseCss
            }
            onClick={() => setOpen(false)}
          />
          <Content
            className={
              menuLayoutContextValue.animationOn
                ? contentCss({ isOpen })
                : contentBaseCss
            }
          >
            <Box px="16">
              <MenuLayoutContext.Provider value={menuLayoutContextValue}>
                {children}
              </MenuLayoutContext.Provider>
            </Box>
          </Content>
        </Portal>
      ) : (
        <GuideModal
          defaultOpen
          closeCallback={handleGuideCloseCallback}
          trigger={null}
        />
      )}
    </Root>
  );
};
