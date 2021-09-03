import { toSnakeCase } from "object-change-case";

import ErrorResponse from "./error-response";

const errorMap = new Map<number, string>([
  [500, "Internal Server Error"],
  [501, "Not Implemented"],
  [502, "Bad Gateway"],
  [503, "Service Unavailable"],
  [504, "Gateway Timeout"],
  [505, "HTTP Version Not Supported"],
  [506, "Variant Also Negotiates"],
  [507, "Insufficient Storage"],
  [508, "Loop Detected"],
  [510, "Not Extended"],
  [511, "Network Authentication Required"],
]);

function createServerErrorResponse(statusCode: number): ErrorResponse {
  const error = toSnakeCase(errorMap.get(statusCode) ?? "Unknown");
  return {
    error,
  };
}

export default createServerErrorResponse;
