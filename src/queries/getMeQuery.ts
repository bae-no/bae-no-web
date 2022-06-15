import { queryToolkit } from "src/queryClient";
import { ServerResponseBase } from "src/types";
import { kyInstance } from "src/utils";

interface GetMeResponse {
  user: {
    address: [];
    defaultAddressId: string;
    email: string;
    id: number;
    profile: {
      save_money: number;
    };
  };
}

const getMeApi = () => () =>
  kyInstance.get("v1/users/me").json<ServerResponseBase<GetMeResponse>>();

export const getMeQuery = queryToolkit(["getMe"], getMeApi, {
  defaultOptions: { retry: 0 },
});
