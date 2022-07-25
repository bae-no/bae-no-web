import { useId } from "react";

import { Item, Indicator } from "@radix-ui/react-radio-group";

import { Box } from "../Box";
import { sprinkles } from "../sprinkles.css";
import { Typography } from "../Typography";

import { radioIndicatorCss, radioItemCss } from "./Radio.css";
import { RadioContentValueProps } from "./Radio.type";

export const RadioContent = ({ label, value }: RadioContentValueProps) => {
  const id = useId();
  return (
    <Box alignItems="center" flexDirection="row" gap="16" key={label}>
      <Item className={radioItemCss} id={id} value={value || label}>
        <Indicator className={radioIndicatorCss} />
      </Item>
      <Typography
        as="label"
        className={sprinkles({ cursor: "pointer" })}
        fontSize="body2-m"
        htmlFor={id}
      >
        {label}
      </Typography>
    </Box>
  );
};
