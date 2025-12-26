import { WickServiceAuth } from "./wick-service-auth.ts";
import { WickServiceUser } from "./wick-service-user.ts";
import { WickServiceSNS } from "./wick-service-sns.ts";
import { WickServiceBase } from "./wick-service-base.ts";

export class WickService extends WickServiceBase {
  public readonly auth: WickServiceAuth;
  public readonly user: WickServiceUser;
  public readonly sns: WickServiceSNS;

  constructor(proxyUrl?: string) {
    super(proxyUrl);
    this.auth = new WickServiceAuth(this.instance);
    this.user = new WickServiceUser(this.instance);
    this.sns = new WickServiceSNS(this.instance);
  }
}
