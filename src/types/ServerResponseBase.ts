export interface ServerResponseBase<TResponse = unknown, TError = unknown> {
  response: TResponse;
  error: TError;
  success: boolean;
}
