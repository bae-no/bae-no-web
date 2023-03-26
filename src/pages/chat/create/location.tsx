import SearchLocation from "src/modules/SearchLocation/SearchLocation";
import { Box } from "src/ui/Box";
import { Container } from "src/ui/Container";
import Divider from "src/ui/Divider";

const SetLocationPage = () => (
  <SearchLocation nextUrl="/chat/create/location-detail">
    <SearchLocation.Head />
    <Container paddingTop="32">
      <SearchLocation.Title>배달 공유존을 알려주세요.</SearchLocation.Title>
    </Container>
    <Box marginTop="32">
      <Container>
        <SearchLocation.Input />
        <SearchLocation.CurrentLocation />
      </Container>
      <Divider
        backgroundColor="black8"
        height="8"
        marginBottom="16"
        marginTop="8"
        width="full"
      />
      <Container>
        <SearchLocation.RecentLocation title="최근 검색한 배달 공유존" />
      </Container>
    </Box>
  </SearchLocation>
);

export default SetLocationPage;
