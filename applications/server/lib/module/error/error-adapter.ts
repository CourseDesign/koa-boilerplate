import { toSnakeCase } from "object-change-case";

import ErrorResponse from "./error-response";

class ErrorAdapter implements ErrorResponse {
  readonly error: string;

  readonly errorDescription?: string;

  readonly errorUri?: string;

  constructor(error: Error & { uri?: string }) {
    this.error = toSnakeCase(error.name);
    this.errorDescription = error.message;
    this.errorUri = error.uri;
  }
}

export default ErrorAdapter;
