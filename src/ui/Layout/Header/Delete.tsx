import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

interface Props {
  onClick: () => void;
}

const Delete = ({ onClick }: Props) => (
  <Box aria-label="삭제하기" as="button" type="button" onClick={onClick}>
    <Icon name="trash" />
  </Box>
);
export default Delete;
