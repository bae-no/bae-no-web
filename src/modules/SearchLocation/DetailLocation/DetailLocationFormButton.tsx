import { useFormContext } from "react-hook-form";

import { Button } from "src/ui/Button";

import { EnrollParams } from "./detailLocationType";

interface DetailLocationFormButtonProps {
  isLoading: boolean;
}

export const DetailLocationFormButton = ({
  isLoading,
}: DetailLocationFormButtonProps) => {
  const { formState } = useFormContext<EnrollParams>();
  const { isValid } = formState;

  return (
    <Button disabled={!isValid || isLoading} type="submit">
      확인
    </Button>
  );
};
