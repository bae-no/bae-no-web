import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

interface Props {
  visible: boolean;
  onClick: () => void;
}

const Delete = ({ visible, onClick }: Props) => {
  return (
    <Box aria-label="삭제하기" as="button" type="button" onClick={onClick}>
      {visible ? (
        <Typography fontSize="body2-m" color="black2">
          선택해제
        </Typography>
      ) : (
        <Icon name="trash" />
      )}
    </Box>
  );
};

export default Delete;
