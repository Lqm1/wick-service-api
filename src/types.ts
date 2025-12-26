export interface User {
  id: string;
  username: string;
  nickname: string;
  email: string | null;
  phone: string | null;
  profileImageUrl: string | null;
  headerImageUrl: string | null;
  biography: string;
  birthdate: string;
  gender: string;
  city: string | null;
  region: string | null;
  country: string | null;
  cognitoUserId: string | null;
  deviceId: string | null;
  guestSecret: string | null;
  stripeId: string;
  occupationId: string | null;
  award: string | null;
  favoriteGenres: string[];
  followersCount: number;
  followsCount: number;
  point: {
    billingPoint: number;
    freePoint: number;
  };
  ps: number;
  isOfficial: boolean;
  isPrivate: boolean;
  isInvisibleFollower: boolean;
  isMarketplaceAllowed: boolean;
  lastSigninAt: string | null;
  locationLastUpdatedDate: string | null;
  requestReviewShownAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface GuestSignUpResponse {
  cursor: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface GuestSignInRequest {
  guestSecret: string;
  screenWidth: number;
  deviceId: string | null;
}

export interface GuestSignInResponse {
  cursor: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface CheckTermsResponse {
  cursor: string;
  data: {
    updatedPrivacyPolicy: boolean;
    updatedTermOfUse: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface CheckTermsRequest {
  userId: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
  guestUserId: string;
  guestSecret: string;
}

export interface SignUpResponse {
  cursor: string;
  data: {
    created_at: string;
    email: string;
    guestMigrated: boolean;
    id: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface SignInRequest {
  email: string;
  password: string;
  screenWidth: number;
  deviceId: string;
}

export interface SignInResponse {
  cursor: string;
  data: {
    user: User;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface ConfirmRequest {
  device_type: string;
  token_hash: string;
  type: string;
  email: string;
}
