import { CreateChatForm } from "src/modules/Chat/CreateForm";
import { Container } from "src/ui/Container";
import { Header, Layout } from "src/ui/Layout";
import { Typography } from "src/ui/Typography";

const CreatePage = () => (
  <Layout headerProps={{ leftNode: <Header.Back /> }}>
    <Container gap="32" marginTop="32">
      <Typography color="black2" fontSize="headline2">
        만드실 공유딜에 대한
        <br />
        정보를 입력해주세요.
      </Typography>
      <CreateChatForm />
    </Container>
  </Layout>
);

export default CreatePage;
