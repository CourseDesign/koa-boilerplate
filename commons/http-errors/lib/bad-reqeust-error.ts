import HttpError from "./http-error";

class BadRequestError extends HttpError {
  constructor(message?: string, public readonly details?: string[]) {
    super(400, message);
  }
}

export default BadRequestError;
