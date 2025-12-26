/**
 * User information from Wick Service
 */
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

/**
 * Response from guest sign-up request
 * Contains access token, refresh token, and user information
 */
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

/**
 * Request parameters for guest sign-in
 */
export interface GuestSignInRequest {
  guestSecret: string;
  screenWidth: number;
  deviceId: string | null;
}

/**
 * Response from guest sign-in request
 * Contains access token, refresh token, and user information
 */
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

/**
 * Response indicating if terms of service or privacy policy were updated
 */
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

/**
 * Request to check if terms have been updated for a user
 */
export interface CheckTermsRequest {
  userId: string;
}

/**
 * Semantic version information
 */
export interface VersionInfo {
  major: number;
  minor: number;
  patch: number;
}

/**
 * API version information for iOS and Android apps
 */
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

/**
 * Unread notification counts for each notification type
 */
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

/**
 * Campaign information
 */
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

/**
 * Response containing campaign prizes information
 */
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

/**
 * Request parameters for campaign prizes
 */
export interface CampaignPrizesRequest {
  offset: number;
}

/**
 * Response indicating if password is required
 */
export interface IsPasswordResponse {
  cursor: string;
  data: {
    isPasswordRequired: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Request to update device tokens for push notifications
 */
export interface TokenRequest {
  userId: string;
  ios_token: string | null;
  android_token: string | null;
}

/**
 * Response from token update request
 */
export interface TokenResponse {
  cursor: string;
  data: {
    success: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Response containing ad wall URL
 */
export interface AdWallResponse {
  cursor: string;
  data: {
    url: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Event campaign details
 */
export interface EventCampaign {
  campaignId: string;
  description: string;
  endsAt: string;
  imageUrl: string;
  name: string;
  startsAt: string;
}

/**
 * Response containing event campaign information and user's participation status
 */
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

/**
 * Daily lottery status information
 */
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

/**
 * Response from getting user action information
 */
export interface UserActionGetResponse {
  cursor: string;
  data: {
    deviceId: string | null;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Request to record user action
 */
export interface UserActionRequest {
  actionType: string;
  option1: string;
  option2: string;
}

/**
 * Response from posting user action
 */
export interface UserActionPostResponse {
  cursor: string;
  data: {
    message: string;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * User occupation information
 */
export interface UserOccupation {
  id: string;
  name: string;
  userCount: number;
}

/**
 * Request parameters for user occupation list
 */
export interface UserOccupationListRequest {
  excludeEmpty: boolean;
  sortByCount: boolean;
}

/**
 * Response containing list of user occupations
 */
export interface UserOccupationListResponse {
  cursor: string;
  data: UserOccupation[];
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Request to update user profile information
 */
export interface UpdateUserRequest {
  birthdate?: string;
  nickname?: string;
  username: string;
  biography?: string;
  isPrivate?: boolean;
  awardId?: string;
  profileImage?: Blob | File;
  headerImage?: Blob | File;
}

/**
 * Response containing updated user information
 */
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

/**
 * Request to update user preferences (gender and genres)
 */
export interface UpdatePreferencesRequest {
  gender: string;
  genres: string[];
}

/**
 * Response from updating user preferences
 */
export interface UpdatePreferencesResponse {
  cursor: string;
  data: {
    result: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * External SNS account information
 */
export interface ExternalSns {
  followerCount: number;
  isShown: boolean;
  profileUrl: string;
  snsType: string;
  snsUserId: string;
}

/**
 * Detailed user profile information
 */
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

/**
 * Request to follow or unfollow a user
 */
export interface FollowRequest {
  followingUserId: string;
  followedUserId: string;
}

/**
 * Response from follow/unfollow request
 */
export interface FollowResponse {
  cursor: string;
  data: {
    approved: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * User information in search results
 */
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

/**
 * Request to search for users
 */
export interface SearchUsersRequest {
  keyword: string;
  userId: string;
  offset: number;
  occupationId?: string;
}

/**
 * Response containing search results for users
 */
export interface SearchUsersResponse {
  cursor: string;
  data: SearchUser[];
  hasNext: boolean;
  limit: number;
  message: string;
  offset: number;
  totalCount: number;
}

/**
 * Request to mark notifications as read
 */
export interface MarkNotificationsReadRequest {
  type: string;
}

/**
 * Response from marking notifications as read
 */
export interface MarkNotificationsReadResponse {
  cursor: string;
  data: {
    result: boolean;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Basic user information in a post
 */
export interface PostUser {
  id: string;
  isFollow: boolean;
  isOfficial: boolean;
  isPrivate: boolean;
  nickname: string;
  profileImageUrl: string | null;
  username: string;
}

/**
 * Request to create a new post
 */
export interface CreatePostRequest {
  body?: string;
  userId: string;
  replyToPostId?: string;
  repostToPostId?: string;
  hasPostMemory: boolean;
  isUseAI: boolean;
  isSensitive: boolean;
  needMonetization: boolean;
  images?: (Blob | File)[];
  videos?: (Blob | File)[];
}

/**
 * Response containing created post information
 */
export interface CreatePostResponse {
  cursor: string;
  data: {
    body: string;
    contents: string;
    createdAt: string;
    hasPostMemory: boolean;
    hashtagList: unknown | null;
    id: string;
    imageUrls: string[];
    isRepost: boolean;
    isSensitive: boolean;
    isSuperReply: boolean;
    isUseAI: boolean;
    memoryList: unknown[];
    mentionList: unknown | null;
    needMonetization: boolean;
    postUser: PostUser;
    replyPoint: number;
    replyToPostId: string | null;
    repost: unknown | null;
    repostCount: number;
    repostId: string | null;
    videoUrl: string[];
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Request to favorite (like) a post
 */
export interface FavoriteRequest {
  userId: string;
  postId: string;
  favPoint: number;
}

/**
 * Response from favoriting a post
 */
export interface FavoriteResponse {
  cursor: string;
  data: {
    sendFavoriteCount: number;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Image information with dimensions and URL
 */
export interface ImageInfo {
  height: number;
  imageUrl: string;
  width: number;
}

/**
 * Hashtag information
 */
export interface Hashtag {
  id: string;
  tagName: string;
}

/**
 * Detailed user information in a post
 */
export interface PostUserDetail {
  id: string;
  isMarketplaceAllowed: boolean;
  isOfficial: boolean;
  isPrivate: boolean;
  nickname: string;
  occupation: {
    id: string;
    name: string;
  } | null;
  profileImageUrl: string | null;
  username: string;
}

/**
 * Post information with all details
 */
export interface Post {
  body: string;
  contents: string;
  createdAt: string;
  favoriteCount: number;
  hasPostMemory: boolean;
  hashtagList: Hashtag[];
  id: string;
  imageUrls: ImageInfo[] | null;
  isDeleted: boolean;
  isFavorite: boolean;
  isMarketplaceAllowed?: boolean;
  isPinned: boolean;
  isReceived: boolean;
  isRepost: boolean;
  isSensitive: boolean;
  isSuperFavorite: boolean;
  isUseAI: boolean;
  link?: string | null;
  memoryList: unknown[];
  mentionList: unknown[];
  needMonetization: boolean;
  postUser: PostUserDetail;
  replyCount: number;
  replyPoint: number;
  replyToPostId: string | null;
  repost: Post | null;
  repostCount: number;
  repostId?: string | null;
  repostToPostId: string | null;
  sendFavoriteCount: number;
  superReplyCount: number;
  updatedAt?: string;
  url: string | null;
  videoUrl: unknown[] | null;
}

/**
 * Request to get posts from timeline
 */
export interface GetPostsRequest {
  userId: string;
  type: string;
  keyword?: string;
  followPostCursor?: string;
  highFollowerCursor?: string;
}

/**
 * Response containing list of posts
 */
export interface GetPostsResponse {
  data: Post[];
  followPostCursor: string | null;
  hasNext: boolean;
  highFollowerCursor: string | null;
  limit: number;
  totalCount: number;
}

/**
 * Request to get detailed post information
 */
export interface GetPostDetailRequest {
  userId: string;
  postId: string;
}

/**
 * Response containing detailed post information
 */
export interface GetPostDetailResponse {
  cursor: string;
  data: Post;
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Request to get posts from a specific user
 */
export interface GetUserPostsRequest {
  userId: string;
  cursor?: string;
  limit: number;
  type: string;
  memoryId?: string;
}

/**
 * Response containing user's posts
 */
export interface GetUserPostsResponse {
  cursor: string;
  data: Post[];
  hasNext: boolean;
  limit: number;
  message: string;
  offset: number;
}

/**
 * Request to search posts by keyword
 */
export interface SearchRequest {
  userId: string;
  offset: number;
  keyword: string;
  type: "post" | "image";
}

/**
 * Response containing search results
 */
export interface SearchResponse {
  cursor: string;
  data: Post[];
  hasNext: boolean;
  limit: number;
  message: string;
  offset: number;
  totalCount: number;
}

/**
 * Request to get trending posts
 */
export interface TrendPostsRequest {
  trend: string;
  limit: number;
  cursor?: string;
}

/**
 * Response containing trending posts
 */
export interface TrendPostsResponse {
  cursor: string;
  data: Post[];
  hasNext: boolean;
  limit: number;
  message: string;
  offset: number;
  totalCount: number;
}

/**
 * Request to sign up with email and password
 */
export interface SignUpRequest {
  email: string;
  password: string;
  guestUserId: string;
  guestSecret: string;
}

/**
 * Response from sign-up request
 */
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

/**
 * Request to sign in with email and password
 */
export interface SignInRequest {
  email: string;
  password: string;
  screenWidth: number;
  deviceId: string;
}

/**
 * Response from sign-in request
 */
export interface SignInResponse {
  cursor: string;
  data: {
    user: User;
  };
  hasNext: boolean;
  message: string;
  offset: number;
}

/**
 * Request to confirm email or registration
 */
export interface ConfirmRequest {
  device_type: string;
  token_hash: string;
  type: string;
  email: string;
}
