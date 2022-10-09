import { useSampleQuery } from "src/graphql";
import { withGraphql } from "src/utils/graphql/withGraphql";

const Test = () => {
  const [result] = useSampleQuery({
    variables: { sampleId: "633461a8a014342d8411f35c" },
  });

  const { data, fetching, error } = result;

  if (fetching) return <div>Loading..</div>;
  if (error) return <div>{error.message}</div>;

  if (!data) return <div>No data</div>;

  return (
    <div>
      urql test
      <br />
      {data.sample.email}
      <br />
      {data.sample.id}
      <br />
      {data.sample.name}
    </div>
  );
};

export default withGraphql(Test);
