import { useId } from "react";

import { Item, Indicator } from "@radix-ui/react-radio-group";

import { Box } from "../Box";
import { sprinkles } from "../sprinkles.css";
import { Typography } from "../Typography";

import { radioIndicatorCss, radioItemCss } from "./Radio.css";
import { RadioProps } from "./Radio.type";

export const RadioContent = ({
  contentValue,
}: Pick<RadioProps, "contentValue">) => {
  const id = useId();
  return (
    <>
      {contentValue.map(({ label, value }) => (
        <Box alignItems="center" flexDirection="row" gap="md" key={label}>
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
      ))}
    </>
  );
};
