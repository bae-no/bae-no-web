export interface ServerResponseBase<TResponse = unknown, TError = unknown> {
  error: TError;
  response: TResponse;
  success: boolean;
}
