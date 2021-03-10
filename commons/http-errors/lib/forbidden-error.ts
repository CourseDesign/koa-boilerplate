import HttpError from "./http-error";

class ForbiddenError extends HttpError {
  constructor(message?: string) {
    super(403, message);
  }
}

export default ForbiddenError;
