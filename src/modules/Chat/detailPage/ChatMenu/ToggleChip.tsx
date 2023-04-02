import { Box } from "src/ui/Box";
import { Typography } from "src/ui/Typography";

interface ToggleChipProps {
  isActive?: boolean;
}

interface ActiveObject {
  borderColor: "orange2" | "black7";
  text: "ON" | "OFF";
  textColor: "orange2" | "black4";
}

export const ToggleChip = ({ isActive }: ToggleChipProps) => {
  const activeObject: ActiveObject = isActive
    ? {
        borderColor: "orange2",
        text: "ON",
        textColor: "orange2",
      }
    : {
        borderColor: "black7",
        text: "OFF",
        textColor: "black4",
      };

  return (
    <Box
      borderColor={activeObject.borderColor}
      borderRadius="48"
      borderStyle="solid"
      borderWidth="1"
      color={activeObject.textColor}
      px="12"
      py="4"
    >
      <Typography fontSize="caption1-m">{activeObject.text}</Typography>
    </Box>
  );
};
