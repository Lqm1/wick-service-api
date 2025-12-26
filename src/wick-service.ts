import { WickServiceAuth } from "./wick-service-auth.ts";
import { WickServiceUser } from "./wick-service-user.ts";
import { WickServiceSNS } from "./wick-service-sns.ts";
import { WickServiceBase } from "./wick-service-base.ts";

/**
 * Main Wick Service API client
 * Provides access to authentication, user management, and SNS features
 *
 * @example
 * ```ts
 * const service = new WickService();
 * const response = await service.auth.guestSignUp();
 * ```
 */
export class WickService extends WickServiceBase {
  /**
   * Authentication API methods
   */
  public readonly auth: WickServiceAuth;

  /**
   * User management API methods
   */
  public readonly user: WickServiceUser;

  /**
   * SNS (Social Network Service) API methods
   */
  public readonly sns: WickServiceSNS;

  /**
   * Creates a new WickService instance
   * @param proxyUrl - Optional proxy URL for HTTP requests
   */
  constructor(proxyUrl?: string) {
    super(proxyUrl);
    this.auth = new WickServiceAuth(this.instance);
    this.user = new WickServiceUser(this.instance);
    this.sns = new WickServiceSNS(this.instance);
  }
}
