// FIXME: https://github.com/graphql/swapi-graphql 참고
/**
 * @generated SignedSource<<bc6faba1e9bf117a55238da5883dfac0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RelayTestQuery$variables = {
  first: number;
};
export type RelayTestQuery$data = {
  readonly allFilms: {
    readonly films: ReadonlyArray<{
      readonly title: string | null;
    } | null> | null;
  } | null;
};
export type RelayTestQuery = {
  response: RelayTestQuery$data;
  variables: RelayTestQuery$variables;
};

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: 'LocalArgument',
        name: 'first',
      },
    ],
    v1 = [
      {
        kind: 'Variable',
        name: 'first',
        variableName: 'first',
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: 'ScalarField',
      name: 'title',
      storageKey: null,
    };
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Fragment',
      metadata: null,
      name: 'RelayTestQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'FilmsConnection',
          kind: 'LinkedField',
          name: 'allFilms',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Film',
              kind: 'LinkedField',
              name: 'films',
              plural: true,
              selections: [v2 /*: any*/],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      type: 'Root',
      abstractKey: null,
    },
    kind: 'Request',
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: 'Operation',
      name: 'RelayTestQuery',
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: 'FilmsConnection',
          kind: 'LinkedField',
          name: 'allFilms',
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              concreteType: 'Film',
              kind: 'LinkedField',
              name: 'films',
              plural: true,
              selections: [
                v2 /*: any*/,
                {
                  alias: null,
                  args: null,
                  kind: 'ScalarField',
                  name: 'id',
                  storageKey: null,
                },
              ],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: 'a8d587b96e6f3f5c043bf3b7075db8df',
      id: null,
      metadata: {},
      name: 'RelayTestQuery',
      operationKind: 'query',
      text: 'query RelayTestQuery(\n  $first: Int!\n) {\n  allFilms(first: $first) {\n    films {\n      title\n      id\n    }\n  }\n}\n',
    },
  };
})();

(node as any).hash = '3c427fcbe839b206da6da79530ecac0a';

export default node;
