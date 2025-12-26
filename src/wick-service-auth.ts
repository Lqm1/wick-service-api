import { WickServiceBase } from "./wick-service-base.ts";
import type {
  CheckTermsRequest,
  CheckTermsResponse,
  ConfirmRequest,
  GuestSignInRequest,
  GuestSignInResponse,
  GuestSignUpResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from "./types.ts";
import { PROD_API_WICK_SERVICE_URL } from "./constants.ts";

/**
 * Authentication API methods for Wick Service
 * Handles guest and regular user authentication
 */
export class WickServiceAuth {
  constructor(private readonly instance: WickServiceBase["instance"]) {
    const authUrl = new URL("/auth", PROD_API_WICK_SERVICE_URL);
    this.instance = this.instance.extend({
      prefixUrl: authUrl.toString(),
    });
  }

  /**
   * Sign up as a guest user
   * @returns Guest user credentials including access token and user info
   */
  guestSignUp(): Promise<GuestSignUpResponse> {
    return this.instance.post("guest-signup").json();
  }

  /**
   * Sign in as a guest user with existing credentials
   * @param request - Guest sign-in credentials
   * @returns Access token and user information
   */
  guestSignIn(request: GuestSignInRequest): Promise<GuestSignInResponse> {
    return this.instance.post("guest-signin", {
      json: request,
    }).json();
  }

  /**
   * Check if terms of service or privacy policy have been updated
   * @param request - User ID to check terms for
   * @returns Updated terms status
   */
  checkTerms(request: CheckTermsRequest): Promise<CheckTermsResponse> {
    return this.instance.get("checkTerms", {
      searchParams: request as unknown as Record<string, string>,
    }).json();
  }

  /**
   * Sign up a new regular user account
   * @param request - User registration information
   * @returns New user credentials and information
   */
  signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return this.instance.post("signup", {
      json: request,
    }).json();
  }

  /**
   * Sign in with email and password
   * @param request - Login credentials
   * @returns Access token and user information
   */
  signIn(request: SignInRequest): Promise<SignInResponse> {
    return this.instance.post("signin", {
      json: request,
    }).json();
  }

  /**
   * Confirm user registration or email verification
   * @param request - Confirmation code and related information
   */
  async confirm(request: ConfirmRequest): Promise<void> {
    await this.instance.get("confirm", {
      searchParams: request as unknown as Record<string, string>,
    });
  }
}
