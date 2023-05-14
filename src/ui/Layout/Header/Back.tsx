import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import ArrowLeftIcon from "src/ui/Icon/svgs/arrow-left.svg";
import { colors } from "src/ui/tokens/color";

interface BackProps {
  onClick?: () => void;
}

const Back = ({ onClick }: BackProps) => {
  const router = useRouter();
  const handleGoBack = () => {
    onClick?.();
    router.back();
  };

  return (
    <Box aria-label="뒤로가기" as="button" type="button" onClick={handleGoBack}>
      <ArrowLeftIcon color={colors.black1} />
    </Box>
  );
};

export default Back;
