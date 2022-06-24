import { forwardRef, ForwardedRef } from "react";

import { Root } from "@radix-ui/react-radio-group";

import { Box } from "../Box";

import { RadioProps } from "./Radio.type";
import { RadioContent } from "./RadioContent";

const Radio = forwardRef(
  (
    { contentValue, onValueChange, defaultValue, ...rest }: RadioProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <Root
      {...rest}
      defaultValue={defaultValue}
      ref={ref}
      onValueChange={onValueChange}
    >
      <Box gap="lg">
        {contentValue.map(({ label, value }) => (
          <RadioContent key={label} label={label} value={value} />
        ))}
      </Box>
    </Root>
  )
);

export default Radio;
