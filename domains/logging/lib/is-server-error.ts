function isServerError(status: number): boolean {
  return status >= 500 && status < 600;
}

export default isServerError;
