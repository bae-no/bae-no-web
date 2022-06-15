import { cloneElement, ReactElement, useId } from "react";

import { ComponentBaseProps } from "src/types";

import { Box } from "../Box";
import { Typography } from "../Typography";

type State = "valid" | "invalid";

interface WithLabelProps {
  children: ReactElement<ComponentBaseProps & { state?: State }>;
  invalidMessage?: string;
  label?: string;
  size?: "large" | "small";
  state?: State;
  validMessage?: string;
}

const FormField = ({
  children,
  label,
  validMessage,
  invalidMessage,
  state,
  size = "large",
}: WithLabelProps) => {
  const childId = useId();
  const labelId = useId();
  const messageId = useId();

  const isValid = state === "valid";
  const isLarge = size === "large";

  const renderMessageCondition =
    (state === "valid" && validMessage) ||
    (state === "invalid" && invalidMessage);

  return (
    <Box gap="xxs">
      {label && (
        <Typography
          as="label"
          fontSize="body2-m"
          htmlFor={childId}
          id={labelId}
        >
          {label}
        </Typography>
      )}
      {cloneElement(children, {
        "aria-describedby": renderMessageCondition ? messageId : undefined,
        "aria-labelledby": label ? labelId : undefined,
        id: childId,
        state,
      })}
      {renderMessageCondition && (
        <Typography
          as="span"
          color={isValid ? "success1" : "danger1"}
          fontSize={`caption${isLarge ? "1-m" : "2-r"}`}
          id={messageId}
        >
          {isValid ? validMessage : invalidMessage}
        </Typography>
      )}
    </Box>
  );
};

export default FormField;
