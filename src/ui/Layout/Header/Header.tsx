import { ReactNode } from "react";

import { Box } from "src/ui/Box";
import { Sprinkles } from "src/ui/sprinkles.css";
import { Typography } from "src/ui/Typography";

import Back from "./Back";
import Delete from "./Delete";
import { headerCss } from "./Header.css";
import Notification from "./Notification";
import Setting from "./Setting";

interface HeaderBaseProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  backgroundColor?: Sprinkles["backgroundColor"];
  leftNode?: ReactNode;
  rightNode?: ReactNode;
}

interface HeaderWithTitleProps extends HeaderBaseProps {
  mainNode?: never;
  title?: string;
}

interface HeaderWithNodeProps extends HeaderBaseProps {
  mainNode?: ReactNode;
  title?: never;
}

export type HeaderProps = HeaderWithTitleProps | HeaderWithNodeProps;

const Header = ({
  title,
  as = "h1",
  leftNode,
  rightNode,
  mainNode,
  backgroundColor = "white",
}: HeaderProps) => (
  <Box
    align="center"
    as="header"
    backgroundColor={backgroundColor}
    className={headerCss}
    flexDirection="row"
    justify="center"
    position="sticky"
    px="16"
    top="0"
    zIndex={1}
  >
    {leftNode && <Box>{leftNode}</Box>}
    {title ? (
      <Box align="center" width="full">
        <Typography as={as} fontSize="headline5">
          {title}
        </Typography>
      </Box>
    ) : (
      mainNode
    )}
    {rightNode && <Box>{rightNode}</Box>}
  </Box>
);

Header.Back = Back;
Header.Notification = Notification;
Header.Delete = Delete;
Header.Setting = Setting;

export default Header;
