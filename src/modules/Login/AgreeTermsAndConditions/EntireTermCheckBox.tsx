import { CheckedState } from "@radix-ui/react-checkbox";
import { useController, useFormContext } from "react-hook-form";

import { CheckBox } from "src/ui/CheckBox";

import { AGREE_TERM_ARRAY, TermsAndConditions } from "./modules";

export const EntireTermCheckBox = () => {
  const { control, setValue, formState } = useFormContext<TermsAndConditions>();
  const { field } = useController({
    control,
    name: "entireTerm",
  });

  const handleEntireCheck = (value: CheckedState) => {
    field.onChange(Boolean(value));
    AGREE_TERM_ARRAY.forEach((item) => {
      setValue(item.name, Boolean(value), { shouldValidate: Boolean(value) });
    });
  };

  return (
    <CheckBox
      checked={formState.isValid}
      label="전체동의"
      size="large"
      onCheckedChange={handleEntireCheck}
    />
  );
};
