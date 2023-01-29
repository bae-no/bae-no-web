import { getCookie } from "./cookie";

export const fetchGraphql =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    // eslint-disable-next-line no-undef
    options?: RequestInit["headers"] & { Authorization?: string },
  ): (() => Promise<TData>) =>
  async () => {
    const authHeader =
      typeof document !== "undefined"
        ? {
            Authorization: `Bearer ${getCookie("token")}`,
          }
        : null;

    const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL as string, {
      body: JSON.stringify({
        query,
        variables,
      }),
      headers: {
        "Content-Type": "application/json",
        ...authHeader,
        ...options,
      },
      method: "POST",
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0] || {};
      throw new Error(message || "Error…");
    }

    return json.data;
  };
