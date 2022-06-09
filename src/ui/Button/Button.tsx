import Link from "next/link";
import { Box } from "../Box";
import { Icon } from "../Icon";
import { element } from "../reset.css";
import { buttonStyle } from "./Button.css";
import { ButtonProps } from "./Button.type";

function Button({
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
}: ButtonProps) {
  const renderButton = () => (
    <Box
      as={href ? "a" : "button"}
      type={type}
      alignItems="center"
      justifyContent="center"
      flexDirection="row"
      className={[
        element.button,
        buttonStyle({ variant, color, size }),
        disabled && "disabled",
      ]}
      onClick={onClick}
      disabled={disabled}
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

export default Button;
