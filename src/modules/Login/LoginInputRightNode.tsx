import { Box, Icon } from "src/ui";
import { InputProps } from "src/ui/Input/Input.type";

type LoginInputRightNodeProps = Pick<
  InputProps,
  "rightNode" | "onClearClick"
> & {
  isValid: boolean;
};

export const LoginInputRightNode = ({
  isValid,
  rightNode,
  onClearClick,
}: LoginInputRightNodeProps) => (
  <Box>
    {!isValid ? (
      <Box onClick={onClearClick}>
        <Icon color="black7" name="close-typing" size="24" />
      </Box>
    ) : (
      <Box alignItems="flex-end" width="48">
        {rightNode}
      </Box>
    )}
  </Box>
);
