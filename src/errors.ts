import { HTTPError, type NormalizedOptions } from "ky";

/**
 * Custom error class for Wick Service API errors
 * Extends HTTPError with a custom error message from the API response
 */
export class WickServiceError extends HTTPError {
  constructor(
    response: Response,
    request: Request,
    options: NormalizedOptions,
    message: string,
  ) {
    super(response, request, options);
    this.name = "WickServiceError";
    this.message = message;
  }
}
