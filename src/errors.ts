import { HTTPError, NormalizedOptions } from "ky";

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
