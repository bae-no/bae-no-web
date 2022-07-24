import { ReactNode } from "react";

import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

import Back from "./Back";
import { headerCss } from "./Header.css";
import Notification from "./Notification";

interface SideProps {
  children: ReactNode;
  position: "left" | "right";
}

const Side = ({ children, position }: SideProps) => (
  <Box
    position="absolute"
    top="half"
    transform="yHalfMinus"
    {...{ [position]: "md" }}
  >
    {typeof children === "string" ? (
      <Typography color="black2" fontSize="body2-m">
        {children}
      </Typography>
    ) : (
      children
    )}
  </Box>
);

interface HeaderBaseProps {
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

const Header = ({ title, leftNode, rightNode, mainNode }: HeaderProps) => (
  <Box
    align="center"
    as="header"
    backgroundColor="white"
    className={headerCss}
    justify="center"
    position="sticky"
    top="none"
  >
    {leftNode && <Side position="left">{leftNode}</Side>}
    {title ? <Typography fontSize="headline5">{title}</Typography> : mainNode}
    {rightNode && <Side position="right">{rightNode}</Side>}
  </Box>
);

Header.Back = Back;
Header.Notification = Notification;

export default Header;
