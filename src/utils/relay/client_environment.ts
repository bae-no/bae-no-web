import { getRelaySerializedState } from 'relay-nextjs';
import { withHydrateDatetime } from 'relay-nextjs/date';
import { Environment, Network, Store, RecordSource } from 'relay-runtime';

const URL = 'http://localhost:55894';

export function createClientNetwork() {
  return Network.create(async (params, variables) => {
    const response = await fetch(URL, {
      body: JSON.stringify({
        query: params.text,
        variables,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      mode: 'cors',
    });

    const json = await response.text();

    return JSON.parse(json, withHydrateDatetime);
  });
}

let clientEnv: Environment | undefined;
export function getClientEnvironment() {
  if (typeof window === 'undefined') return null;

  if (clientEnv == null) {
    clientEnv = new Environment({
      isServer: false,
      network: createClientNetwork(),
      store: new Store(new RecordSource(getRelaySerializedState()?.records)),
    });
  }

  return clientEnv;
}
