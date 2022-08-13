import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";
import { Typography } from "src/ui/Typography";

interface Props {
  onClick: () => void;
  visible: boolean;
}

const Delete = ({ onClick, visible }: Props) => (
  <Box aria-label="삭제하기" as="button" type="button" onClick={onClick}>
    {visible ? (
      <Typography color="black2" fontSize="body2-m">
        선택해제
      </Typography>
    ) : (
      <Icon name="trash" />
    )}
  </Box>
);
export default Delete;
