import { useController, useFormContext } from "react-hook-form";

import { Box } from "src/ui/Box";
import { CheckBox } from "src/ui/CheckBox";
import { Typography } from "src/ui/Typography";

import { TermsAndConditions } from "./modules";

interface TermCheckBoxProps {
  label: string;
  name: keyof TermsAndConditions;
}

export const TermCheckBox = ({ name, label }: TermCheckBoxProps) => {
  const { control } = useFormContext<TermsAndConditions>();
  const { field } = useController({
    control,
    name,
    rules: {
      required: true,
    },
  });

  return (
    <CheckBox
      checked={field.value}
      key={name}
      label={label}
      rightNode={
        <Box cursor="pointer">
          <Typography
            color="black2"
            fontSize="body2-r"
            textDecoration="underLine"
          >
            보기
          </Typography>
        </Box>
      }
      onCheckedChange={(value) => {
        field.onChange(Boolean(value));
      }}
    />
  );
};
