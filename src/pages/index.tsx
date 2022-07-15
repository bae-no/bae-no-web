import { keys, map, pipe, toArray } from '@fxts/core';
import { usePreloadedQuery } from 'react-relay';
import { RelayProps, withRelay } from 'relay-nextjs';

import { AsyncBoundary } from 'src/components/AsyncBoundary';
import { Typography, Toggle, Popup } from 'src/ui';
import Icon from 'src/ui/Icon/Icon';
import { SVG_ICON_MAP } from 'src/ui/Icon/iconMap';
import { getClientEnvironment } from 'src/utils/relay/client_environment';
import { createServerEnvironment } from 'src/utils/relay/server_environment';

import { query } from '../components/RelayTest';
import { RelayTestQuery } from '../queries/__generated__/RelayTestQuery.graphql';

const LoadingComponent = () => <h1>...loading</h1>;
const ErrorFallback = () => (
  <div>
    <Typography fontSize="body2-b">test</Typography>
    <Toggle />
    <Popup buttonDirection="column" cancelText="tesaaaa" confirmText="test" description="fdsa" title="fas" onConfirm={() => {}}>
      <div>test</div>
    </Popup>
    {pipe(
      SVG_ICON_MAP,
      keys,
      map((key) => <Icon color="orange1" key={key} name={key} size="xxl" />),
      toArray
    )}
  </div>
);

const Test = ({ preloadedQuery }: Omit<RelayProps<{}, RelayTestQuery>, 'CSN'>) => {
  const data = usePreloadedQuery(query, preloadedQuery);
  return <div>{data.allFilms?.films?.[0]?.title}</div>;
};

const Home = ({ preloadedQuery }: RelayProps<{}, RelayTestQuery>) => (
  <AsyncBoundary errorFallback={ErrorFallback} loadingFallback={LoadingComponent}>
    <Test preloadedQuery={preloadedQuery} />
  </AsyncBoundary>
);

export default withRelay(Home, query, {
  createClientEnvironment: () => getClientEnvironment()!,
  createServerEnvironment: async () => createServerEnvironment(),
  variablesFromContext: () => ({ first: 1 }),
});
