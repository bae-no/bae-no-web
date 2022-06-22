/* eslint-disable jsx-a11y/label-has-associated-control */
import { Root, Item, Indicator } from "@radix-ui/react-radio-group";

import { Typography } from "../Typography";

import {
  radioItemStyle,
  radioIndicatorStyle,
  itemLabelBox,
  radioRootStyle,
} from "./Radio.css";

interface RadioProps {
  defaultValue?: string;
  disabled?: boolean;
  onValueChange?: (e?: string) => void;
  radioValue: string[];
}

const Radio = ({
  radioValue,
  disabled = false,
  onValueChange,
  defaultValue,
}: RadioProps) => (
  <Root
    aria-label="View density"
    className={radioRootStyle}
    defaultValue={defaultValue}
    onValueChange={onValueChange}
  >
    {radioValue.map((radioData, index) => (
      <div className={itemLabelBox} key={radioData}>
        <Item
          className={radioItemStyle}
          disabled={disabled}
          id={String(index)}
          value={radioData}
        >
          <Indicator className={radioIndicatorStyle} />
        </Item>
        <label htmlFor={String(index)}>
          <Typography fontSize="body2-m">{radioData}</Typography>
        </label>
      </div>
    ))}
  </Root>
);

export default Radio;
