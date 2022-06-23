import { useId } from "react";

import { Root, Item, Indicator } from "@radix-ui/react-radio-group";

import { ComponentBaseProps } from "src/types";

import { Box } from "../Box";
import { Typography } from "../Typography";

import { radioItemStyle, radioIndicatorStyle } from "./Radio.css";

type RootType = {
  onValueChange?: (e: string) => void;
};

type RadioProps = ComponentBaseProps &
  Pick<RootType, "onValueChange"> & {
    defaultValue?: string;
    disabled?: boolean;
    radioValue: { label: string; value?: string }[];
  };

const Radio = ({
  radioValue,
  disabled = false,
  onValueChange,
  defaultValue,
}: RadioProps) => {
  const id = useId();
  return (
    <Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Box gap="lg">
        {radioValue.map((radioData, index) => (
          <Box
            display="flex"
            flexDirection="row"
            gap="md"
            key={radioData.label}
          >
            <Item
              className={radioItemStyle}
              disabled={disabled}
              id={id + String(index)}
              value={radioData.value || radioData.label}
            >
              <Indicator className={radioIndicatorStyle} />
            </Item>
            <Typography
              as="label"
              fontSize="body2-m"
              htmlFor={id + String(index)}
            >
              {radioData.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Root>
  );
};

export default Radio;
