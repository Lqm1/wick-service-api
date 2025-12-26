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

export class WickServiceAuth {
  constructor(private readonly instance: WickServiceBase["instance"]) {
    const authUrl = new URL("/auth", PROD_API_WICK_SERVICE_URL);
    this.instance = this.instance.extend({
      prefixUrl: authUrl.toString(),
    });
  }

  guestSignUp(): Promise<GuestSignUpResponse> {
    return this.instance.post("guest-signup").json();
  }

  guestSignIn(request: GuestSignInRequest): Promise<GuestSignInResponse> {
    return this.instance.post("guest-signin", {
      json: request,
    }).json();
  }

  checkTerms(request: CheckTermsRequest): Promise<CheckTermsResponse> {
    return this.instance.get("checkTerms", {
      searchParams: request as unknown as Record<string, string>,
    }).json();
  }

  signUp(request: SignUpRequest): Promise<SignUpResponse> {
    return this.instance.post("signup", {
      json: request,
    }).json();
  }

  signIn(request: SignInRequest): Promise<SignInResponse> {
    return this.instance.post("signin", {
      json: request,
    }).json();
  }

  async confirm(request: ConfirmRequest): Promise<void> {
    await this.instance.get("confirm", {
      searchParams: request as unknown as Record<string, string>,
    });
  }
}
