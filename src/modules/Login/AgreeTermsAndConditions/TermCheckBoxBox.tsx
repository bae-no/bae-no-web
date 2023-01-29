import { Box } from "src/ui/Box";

import { EntireTermCheckBox } from "./EntireTermCheckBox";
import { AGREE_TERM_ARRAY } from "./modules";
import { TermCheckBox } from "./TermCheckBox";

export const TermCheckBoxBox = () => (
  <Box gap="16" width="full">
    <EntireTermCheckBox />
    {AGREE_TERM_ARRAY.map((item) => (
      <TermCheckBox key={item.name} label={item.label} name={item.name} />
    ))}
  </Box>
);
