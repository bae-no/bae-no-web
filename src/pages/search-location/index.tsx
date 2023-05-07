import SearchLocation from "src/modules/SearchLocation/SearchLocation";
import { Box } from "src/ui/Box";

const SetLocation = () => (
  <SearchLocation nextUrl="/search-location/detail">
    <SearchLocation.Head />
    <Box paddingTop="32" px="16">
      <SearchLocation.Title>
        배달비 노노를 시작할 장소를 알려주세요.
      </SearchLocation.Title>
      <SearchLocation.AdditionalExplanation>
        장소는 이후에도 변경가능합니다.
      </SearchLocation.AdditionalExplanation>
      <Box marginTop="8">
        <SearchLocation.Input />
        <SearchLocation.CurrentLocation />
      </Box>
    </Box>
  </SearchLocation>
);

export default SetLocation;
