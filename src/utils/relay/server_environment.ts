import { Environment, Network, Store, RecordSource } from 'relay-runtime';

const URL = 'http://localhost:55894';

export function createServerNetwork() {
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
    });

    return response.json();
  });
}

export function createServerEnvironment() {
  return new Environment({
    isServer: true,
    network: createServerNetwork(),
    store: new Store(new RecordSource()),
  });
}
