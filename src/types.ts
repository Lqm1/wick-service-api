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

export interface VersionInfo {
  major: number;
  minor: number;
  patch: number;
}

export interface VersionsResponse {
  cursor: string;
  data: {
    android: VersionInfo;
    android_force_version: string;
    android_self_version: string;
    ios: VersionInfo;
    ios_force_version: string;
    ios_self_version: string;
    pip_allow_android: VersionInfo;
    pip_allow_android_version: string;
    pip_allow_ios: VersionInfo;
    pip_allow_ios_version: string;
    pip_not_allow_android: VersionInfo;
    pip_not_allow_android_version: string;
    pip_not_allow_ios: VersionInfo;
    pip_not_allow_ios_version: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface UnreadTabsResponse {
  cursor: string;
  data: {
    favorite: number;
    followRequest: number;
    mention: number;
    quoteRepost: number;
    reply: number;
    repost: number;
    superFavorite: number;
    superReply: number;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface Campaign {
  campaignId: string;
  description: string;
  endsAt: string;
  externalUrl: string | null;
  imageUrl: string;
  name: string;
  startsAt: string;
  type: string;
}

export interface CampaignPrizesResponse {
  cursor: string;
  data: {
    campaigns: Campaign[];
    invitedCount: number;
  };
  hasNext: boolean;
  limit: number;
  message: string;
  offset: number;
}

export interface CampaignPrizesRequest {
  offset: number;
}

export interface IsPasswordResponse {
  cursor: string;
  data: {
    isPasswordRequired: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface TokenRequest {
  userId: string;
  ios_token: string | null;
  android_token: string | null;
}

export interface TokenResponse {
  cursor: string;
  data: {
    success: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface AdWallResponse {
  cursor: string;
  data: {
    url: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface EventCampaign {
  campaignId: string;
  description: string;
  endsAt: string;
  imageUrl: string;
  name: string;
  startsAt: string;
}

export interface EventCampaignResponse {
  cursor: string;
  data: {
    applyTotalCount: number;
    currentApplyCount: number;
    event: EventCampaign;
    rank: string;
    remainApplyCount: number;
    term: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface DailyLotteryStatusResponse {
  cursor: string;
  data: {
    hasShownDialogToday: boolean;
    lastLotteryResult: string;
    nextEntryStatus: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface UserActionGetResponse {
  cursor: string;
  data: {
    deviceId: string | null;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface UserActionRequest {
  actionType: string;
  option1: string;
  option2: string;
}

export interface UserActionPostResponse {
  cursor: string;
  data: {
    message: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface UserOccupation {
  id: string;
  name: string;
  userCount: number;
}

export interface UserOccupationListRequest {
  excludeEmpty: boolean;
  sortByCount: boolean;
}

export interface UserOccupationListResponse {
  cursor: string;
  data: UserOccupation[];
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface UpdateUserRequest {
  birthdate?: string;
  nickname?: string;
  username?: string;
  biography?: string;
  isPrivate?: boolean;
  awardId?: string;
  profileImage?: Blob | File;
  headerImage?: Blob | File;
}

export interface UpdateUserResponse {
  cursor: string;
  data: {
    award: string | null;
    biography: string;
    birthdate: string;
    cognitoUserId: string;
    email: string;
    externalSns: unknown[];
    favoriteGenres: string[];
    followersCount: number;
    followsCount: number;
    gender: string;
    guestSecret: string | null;
    headerImageUrl: string | null;
    id: string;
    inviteCode: string;
    isOfficial: boolean;
    isPrivate: boolean;
    nickname: string;
    occupation: unknown | null;
    phone: string | null;
    point: {
      billingPoint: number;
      freePoint: number;
    };
    profileImageUrl: string | null;
    ticketCount: number;
    username: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface UpdatePreferencesRequest {
  gender: string;
  genres: string[];
}

export interface UpdatePreferencesResponse {
  cursor: string;
  data: {
    result: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface ExternalSns {
  followerCount: number;
  isShown: boolean;
  profileUrl: string;
  snsType: string;
  snsUserId: string;
}

export interface UserDetailResponse {
  cursor: string;
  data: {
    award: string | null;
    biography: string;
    birthdate: string;
    canPointReceive?: boolean;
    cartItemCount?: number;
    cognitoUserId: string;
    daysNeo: boolean;
    email?: string;
    externalSns: ExternalSns[];
    favoriteGenres?: string[];
    followersCount?: number;
    followsCount?: number;
    gender?: string;
    guestSecret: string | null;
    headerImageUrl: string | null;
    id: string;
    inviteCode?: string;
    isBlocked: boolean;
    isBlocking: boolean;
    isFollow?: boolean;
    isFollowRequest?: boolean;
    isFollower?: boolean;
    isMarketplaceAllowed: boolean;
    isMute?: boolean;
    isOfficial: boolean;
    isPrivate: boolean;
    marketplaceUrl: string;
    needActionNotification: unknown[];
    nickname: string;
    occupation: {
      id: string;
      name: string;
    } | null;
    phone?: string | null;
    point?: {
      billingPoint: number;
      freePoint: number;
    };
    profileImageUrl: string | null;
    ticketCount: number;
    username: string;
    wickInOneMinutes: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface FollowRequest {
  followingUserId: string;
  followedUserId: string;
}

export interface FollowResponse {
  cursor: string;
  data: {
    approved: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

export interface SearchUser {
  biography: string;
  id: string;
  isBlocked: boolean;
  isBlocking: boolean;
  isFollow: boolean;
  isFollowRequest: boolean;
  isFollower: boolean;
  isMarketplaceAllowed: boolean;
  isOfficial: boolean;
  isPrivate: boolean;
  nickname: string;
  profileImageUrl: string | null;
  userSort?: number;
  username: string;
}

export interface SearchUsersRequest {
  keyword: string;
  userId: string;
  offset: number;
  occupationId?: string;
}

export interface SearchUsersResponse {
  cursor: string;
  data: SearchUser[];
  hasNext: boolean;
  limit: number;
  message: string;
  offset: number;
  totalCount: number;
}

export interface MarkNotificationsReadRequest {
  type: string;
}

export interface MarkNotificationsReadResponse {
  cursor: string;
  data: {
    result: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
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
