/**
 * @generated SignedSource<<8ebef5e23ba37ade8bef799c3090aa5e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AuthType = "APPLE" | "GOOGLE" | "KAKAO" | "%future added value";
export type SignInInput = {
  code: string;
  type: AuthType;
};
export type acessMutation$variables = {
  input: SignInInput;
};
export type acessMutation$data = {
  readonly signIn: {
    readonly accessToken: string;
  };
};
export type acessMutation = {
  response: acessMutation$data;
  variables: acessMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SignInResponse",
    "kind": "LinkedField",
    "name": "signIn",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "accessToken",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "acessMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "acessMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4aecf15911bf92ebc173daf0e30e496d",
    "id": null,
    "metadata": {},
    "name": "acessMutation",
    "operationKind": "mutation",
    "text": "mutation acessMutation(\n  $input: SignInInput!\n) {\n  signIn(input: $input) {\n    accessToken\n  }\n}\n"
  }
};
})();

(node as any).hash = "1deb592dfbcefc55352444da19abf7d7";

export default node;
