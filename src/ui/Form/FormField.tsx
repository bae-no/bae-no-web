import { cloneElement, ReactElement, ReactNode, useId } from "react";

import { ComponentBaseProps } from "src/types";

import { Box } from "../Box";
import { FontSize } from "../fontBase.css";
import { space } from "../tokens/space";
import { Typography } from "../Typography";

type State = "valid" | "invalid";

interface WithLabelProps {
  Suffix?: ReactNode;
  children: ReactElement<ComponentBaseProps & { state?: State }>;
  defaultMessage?: string;
  fontSize?: FontSize;
  gap?: keyof typeof space;
  invalidMessage?: string;
  label?: string;
  state?: State;
  validMessage?: string;
}

const FormField = ({
  children,
  label,
  validMessage,
  invalidMessage,
  state,
  fontSize = "caption1-m",
  defaultMessage,
  Suffix,
  gap = "4",
}: WithLabelProps) => {
  const childId = useId();
  const labelId = useId();
  const messageId = useId();

  const isValid = state === "valid";

  const renderMessageCondition =
    (state === "valid" && validMessage) ||
    (state === "invalid" && invalidMessage);

  return (
    <Box gap={gap}>
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
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
      >
        {renderMessageCondition ? (
          <Typography
            as="span"
            color={isValid ? "success1" : "danger1"}
            fontSize={fontSize}
            id={messageId}
          >
            {isValid ? validMessage : invalidMessage}
          </Typography>
        ) : (
          <Typography
            as="span"
            color="black5"
            fontSize={fontSize}
            id={messageId}
          >
            {defaultMessage}
          </Typography>
        )}
        {Suffix}
      </Box>
    </Box>
  );
};

export default FormField;
