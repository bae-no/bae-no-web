import { useReastorageValue } from "@reastorage/react";
import { useFormContext } from "react-hook-form";

import { locationStorage } from "src/store/login";
import { Box } from "src/ui/Box";
import { Input } from "src/ui/Input";
import { Label } from "src/ui/Label";
import { Typography } from "src/ui/Typography";

import { EnrollParams } from "./detailLocationType";

export const DetailLocationInputBox = () => {
  const { jibunAddress, roadAddress } = useReastorageValue(locationStorage);
  const { register, resetField } = useFormContext<EnrollParams>();

  return (
    <Box gap="16">
      <Input
        readOnly
        leftNode={
          <Label color="gray">
            <Typography color="black2" fontSize="caption1-b">
              도로명
            </Typography>
          </Label>
        }
        value={roadAddress ?? jibunAddress}
        variant="underline"
      />
      <Input
        variant="underline"
        onClearClick={() => resetField("addressDetail")}
        {...register("addressDetail", { required: true })}
        placeholder="상세 주소 입력 (아파트/동/호)"
      />
    </Box>
  );
};
