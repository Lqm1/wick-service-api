import { WickServiceAuth } from "./wick-service-auth.ts";
import { WickServiceBase } from "./wick-service-base.ts";

export class WickService extends WickServiceBase {
  public readonly auth: WickServiceAuth;

  constructor(proxyUrl?: string) {
    super(proxyUrl);
    this.auth = new WickServiceAuth(this.instance);
  }
}
