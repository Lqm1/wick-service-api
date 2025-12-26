import { WickServiceBase } from "./wick-service-base.ts";
import type {
  AdWallResponse,
  CampaignPrizesRequest,
  CampaignPrizesResponse,
  DailyLotteryStatusResponse,
  EventCampaignResponse,
  FollowRequest,
  FollowResponse,
  IsPasswordResponse,
  MarkNotificationsReadRequest,
  MarkNotificationsReadResponse,
  SearchUsersRequest,
  SearchUsersResponse,
  TokenRequest,
  TokenResponse,
  UnreadTabsResponse,
  UpdatePreferencesRequest,
  UpdatePreferencesResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UserActionGetResponse,
  UserActionPostResponse,
  UserActionRequest,
  UserDetailResponse,
  UserOccupationListRequest,
  UserOccupationListResponse,
  VersionsResponse,
} from "./types.ts";
import { PROD_API_WICK_SERVICE_URL } from "./constants.ts";

/**
 * User management API methods for Wick Service
 * Handles user profiles, follows, searches, and preferences
 */
export class WickServiceUser {
  constructor(private readonly instance: WickServiceBase["instance"]) {
    const userUrl = new URL("/user", PROD_API_WICK_SERVICE_URL);
    this.instance = this.instance.extend({
      prefixUrl: userUrl.toString(),
    });
  }

  /**
   * Get API version information
   * @returns Version information for iOS and Android apps
   */
  versions(): Promise<VersionsResponse> {
    return this.instance.get("versions").json();
  }

  /**
   * Get unread notification tabs
   * @returns Unread count for each notification tab
   */
  unreadTabs(): Promise<UnreadTabsResponse> {
    return this.instance.get("notifications/unread-tabs").json();
  }

  /**
   * Get campaign prizes information
   * @param request - Pagination parameters
   * @returns Campaign prizes data
   */
  campaignPrizes(
    request: CampaignPrizesRequest,
  ): Promise<CampaignPrizesResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("offset", String(request.offset));

    return this.instance.get("campaign-prizes", {
      searchParams,
    }).json();
  }

  isPasswordRequired(): Promise<IsPasswordResponse> {
    return this.instance.get("receive-point/dashboard/is-password").json();
  }

  updateToken(request: TokenRequest): Promise<TokenResponse> {
    return this.instance.post("token", {
      json: request,
    }).json();
  }

  adwall(): Promise<AdWallResponse> {
    return this.instance.get("adwall").json();
  }

  eventCampaign(): Promise<EventCampaignResponse> {
    return this.instance.get("event-campaign").json();
  }

  dailyLotteryStatus(): Promise<DailyLotteryStatusResponse> {
    return this.instance.get("daily-lottery/status").json();
  }

  getUserAction(): Promise<UserActionGetResponse> {
    return this.instance.get("userAction").json();
  }

  postUserAction(request: UserActionRequest): Promise<UserActionPostResponse> {
    return this.instance.post("userAction", {
      json: request,
    }).json();
  }

  userOccupationList(
    request: UserOccupationListRequest,
  ): Promise<UserOccupationListResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("excludeEmpty", String(request.excludeEmpty));
    searchParams.append("sortByCount", String(request.sortByCount));

    return this.instance.get("UserOccupationList", {
      searchParams,
    }).json();
  }

  updateUser(
    userId: string,
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const formData = new FormData();

    if (request.birthdate !== undefined) {
      formData.append("birthdate", request.birthdate);
    }
    if (request.nickname !== undefined) {
      formData.append("nickname", request.nickname);
    }
    if (request.username !== undefined) {
      formData.append("username", request.username);
    }
    if (request.biography !== undefined) {
      formData.append("biography", request.biography);
    }
    if (request.isPrivate !== undefined) {
      formData.append("isPrivate", String(request.isPrivate));
    }
    if (request.awardId !== undefined) {
      formData.append("awardId", request.awardId);
    }
    if (request.profileImage) {
      formData.append("profileImage", request.profileImage);
    }
    if (request.headerImage) {
      formData.append("headerImage", request.headerImage);
    }

    return this.instance.post(userId, {
      body: formData,
    }).json();
  }

  updatePreferences(
    userId: string,
    request: UpdatePreferencesRequest,
  ): Promise<UpdatePreferencesResponse> {
    return this.instance.post(`${userId}/preferences`, {
      json: request,
    }).json();
  }

  userDetail(userId: string): Promise<UserDetailResponse> {
    return this.instance.get(`${userId}/detail`).json();
  }

  follow(request: FollowRequest): Promise<FollowResponse> {
    return this.instance.post("follow", {
      json: request,
    }).json();
  }

  searchUsers(
    userId: string,
    request: SearchUsersRequest,
  ): Promise<SearchUsersResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("keyword", request.keyword);
    searchParams.append("userId", request.userId);
    searchParams.append("offset", String(request.offset));
    if (request.occupationId !== undefined) {
      searchParams.append("occupationId", request.occupationId);
    }

    return this.instance.get(`${userId}/search`, {
      searchParams,
    }).json();
  }

  markNotificationsRead(
    request: MarkNotificationsReadRequest,
  ): Promise<MarkNotificationsReadResponse> {
    return this.instance.post("notifications/read", {
      json: request,
    }).json();
  }
}
