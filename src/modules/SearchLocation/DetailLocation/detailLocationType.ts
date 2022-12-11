import { AddressType } from "src/graphql";

export interface EnrollParams {
  addressAlias: string;
  addressDetail: string;
  addressType: AddressType;
}
