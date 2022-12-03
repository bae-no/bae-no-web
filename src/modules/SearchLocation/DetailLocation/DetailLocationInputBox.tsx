import { useReastorageValue } from "@reastorage/react";
import { useFormContext } from "react-hook-form";

import { locationStorage } from "src/store/location";
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
        {...register("address.path")}
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
        onClearClick={() => resetField("address.detail")}
        {...register("address.detail")}
        placeholder="상세 주소 입력 (아파트/동/호)"
        variant="underline"
      />
    </Box>
  );
};
