import { useRouter } from "next/router";

import { Box } from "src/ui/Box";
import { Icon } from "src/ui/Icon";

const Back = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <Box aria-label="뒤로가기" as="button" type="button" onClick={handleGoBack}>
      <Icon name="arrow-left" />
    </Box>
  );
};

export default Back;
