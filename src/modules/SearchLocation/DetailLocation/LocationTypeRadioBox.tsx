import { useController, useFormContext } from "react-hook-form";

import { AddressType } from "src/graphql";
import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Input } from "src/ui/Input";
import { Typography } from "src/ui/Typography";

import { EnrollParams } from "./detailLocationType";
import { locationTypeBoxRadioSizeCss } from "./locationTypeRadioBox.css";

const typeObject = {
  ETC: {
    name: "location",
    title: "기타",
  },
  HOME: {
    name: "home-outline",
    title: "우리집",
  },
  WORK: {
    name: "buliding",
    title: "회사",
  },
} as const;

interface LocationTypeProps {
  isSelect: boolean;
  onClick: () => void;
  type: "HOME" | "WORK" | "ETC";
}

export const LocationTypeRadio = ({
  isSelect,
  type,
  onClick,
}: LocationTypeProps) => {
  const color = isSelect ? "orange2" : "black5";
  const { name, title } = typeObject[type];

  return (
    <Box
      alignItems="center"
      aria-checked={isSelect}
      borderColor={color}
      borderStyle="solid"
      borderWidth="2"
      br="8"
      className={locationTypeBoxRadioSizeCss}
      cursor="pointer"
      justifyContent="center"
      role="radio"
      width="full"
      onClick={onClick}
    >
      <Box alignItems="center" gap="4">
        <Icon color={color} name={name} />
        <Typography color={color} fontSize="body2-b">
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

const { Etc, Home, Work } = AddressType;

export const LocationTypeRadioBox = () => {
  const { setValue, register, resetField, control } =
    useFormContext<EnrollParams>();
  const { field } = useController<EnrollParams>({
    control,
    name: "addressType",
    rules: {
      required: true,
    },
  });

  const handleTypeBoxClick = (type: AddressType) => {
    field.onChange(type);
    setValue("addressAlias", "");
  };

  return (
    <Box gap="16">
      <Box
        aria-label="상세 주소 타입 선택"
        flexDirection="row"
        gap="16"
        justifyContent="space-between"
        width="full"
      >
        {[Home, Work, Etc].map((type) => (
          <LocationTypeRadio
            isSelect={field.value === type}
            key={type}
            type={type}
            onClick={() => {
              handleTypeBoxClick(type);
            }}
          />
        ))}
      </Box>
      {field.value === Etc && (
        <Input
          placeholder="주소 별명"
          variant="underline"
          onClearClick={() => resetField("addressAlias")}
          {...register("addressAlias", {
            required: field.value === Etc,
          })}
        />
      )}
    </Box>
  );
};
