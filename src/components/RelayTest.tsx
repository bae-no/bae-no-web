import { useLazyLoadQuery } from 'react-relay';
import { graphql } from 'relay-runtime';

import { RelayTestQuery } from '../queries/__generated__/RelayTestQuery.graphql';

export const query = graphql`
  query RelayTestQuery($first: Int!) {
    allFilms(first: $first) {
      films {
        title
      }
    }
  }
`;

const RelayTest = () => {
  const data = useLazyLoadQuery<RelayTestQuery>(query, { first: 5 });
  return (
    <div>
      Relay Test <br />
      {data.allFilms?.films?.[0]?.title}
      {data.allFilms?.films?.map((film) => (
        <div>{film?.title}</div>
      ))}
    </div>
  );
};

export default RelayTest;
