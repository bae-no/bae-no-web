import { ForwardedRef, forwardRef } from "react";

import Link from "next/link";

import { Box } from "../Box";
import { Icon } from "../Icon";
import { element } from "../reset.css";

import { buttonCss } from "./Button.css";
import { ButtonProps } from "./Button.type";

const Button = forwardRef(
  (
    {
      children,
      variant,
      leftIconName,
      type,
      onClick,
      color,
      size = "l",
      href,
      disabled,
      ...rest
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const renderButton = () => (
      <Box
        alignItems="center"
        as={href ? "a" : "button"}
        className={[
          element.button,
          buttonCss({ color, size, variant }),
          disabled && "disabled",
        ]}
        disabled={disabled}
        flexDirection="row"
        justifyContent="center"
        ref={ref}
        type={type}
        onClick={onClick}
        {...rest}
      >
        {leftIconName && (
          <Icon name={leftIconName} size={size === "l" ? "lg" : "md"} />
        )}
        {children}
      </Box>
    );

    if (href && !disabled) {
      return (
        <Link passHref href={href}>
          {renderButton()}
        </Link>
      );
    }

    return renderButton();
  }
);

export default Button;
