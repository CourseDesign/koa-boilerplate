import ErrorView from "./error.view";
import { snakeCase } from "change-case";
import isServerError from "./is-server-error";

const messages = {
  500: "internal_server_error",
  501: "not_implemented",
  503: "service_unavailable",
  504: "gateway_timeout",
  505: "http_version_not_supported",
  506: "variant_also_negotiates",
  507: "insufficient_storage",
  509: "bandwidth_limit_exceeded",
  510: "not_extended",
};

function errorAdapt(error: Error, status: number): ErrorView {
  if (isServerError(status)) {
    return {
      error: (messages as Record<number, string>)[status] ?? "unknown",
    };
  }

  return {
    error: snakeCase(error.name),
    errorDescription: error.message,
  };
}

export default errorAdapt;
