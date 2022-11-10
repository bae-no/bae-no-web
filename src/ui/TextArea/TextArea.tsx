import { TextareaHTMLAttributes, useId } from "react";

import { Box } from "../Box";
import { Typography } from "../Typography";

import { textAreaCss } from "./TextArea.css";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  value: string;
}

const TextArea = ({ value, maxLength, ...rest }: TextAreaProps) => {
  const suffix = maxLength ? `${value.length}/${maxLength}` : undefined;
  const id = useId();
  return (
    <Box position="relative">
      <textarea
        {...rest}
        className={textAreaCss}
        id={id}
        maxLength={maxLength}
      />
      <Box bottom="12" position="absolute" right="16">
        <Typography
          as="label"
          color="black5"
          fontSize="caption2-r"
          htmlFor={id}
        >
          {suffix}
        </Typography>
      </Box>
    </Box>
  );
};

export default TextArea;
