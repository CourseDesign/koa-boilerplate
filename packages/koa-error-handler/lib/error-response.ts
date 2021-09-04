interface ErrorResponse {
  readonly error: string;

  readonly errorDescription?: string;

  readonly errorUri?: string;
}

export default ErrorResponse;
