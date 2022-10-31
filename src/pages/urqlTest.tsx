/* eslint-disable no-console */
import { SampleDocument, useSampleQuery } from "src/graphql";
import { prefetchQueryOnServerSide } from "src/utils/graphql/prefetchQueryOnServerSide";
import { withGraphql } from "src/utils/graphql/withGraphql";

const Home = () => {
  const [{ data }] = useSampleQuery({
    variables: { sampleId: "633461a8a014342d8411f35c" },
  });
  const [res] = useSampleQuery({
    variables: { sampleId: "635e782ea9f7da4a61dad16e" },
  });

  console.log(data);
  console.log("test1", res);

  return <div>{data?.sample.email}</div>;
};

export default withGraphql(Home);

export const getServerSideProps = prefetchQueryOnServerSide(
  SampleDocument,
  () => ({ sampleId: "633461a8a014342d8411f35c" }),
);
