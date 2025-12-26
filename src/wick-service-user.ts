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
import { toFormData } from "./utils.ts";

export class WickServiceUser {
  constructor(private readonly instance: WickServiceBase["instance"]) {
    const userUrl = new URL("/user", PROD_API_WICK_SERVICE_URL);
    this.instance = this.instance.extend({
      prefixUrl: userUrl.toString(),
    });
  }

  versions(): Promise<VersionsResponse> {
    return this.instance.get("versions").json();
  }

  unreadTabs(): Promise<UnreadTabsResponse> {
    return this.instance.get("notifications/unread-tabs").json();
  }

  campaignPrizes(
    request: CampaignPrizesRequest,
  ): Promise<CampaignPrizesResponse> {
    return this.instance.get("campaign-prizes", {
      searchParams: request as unknown as Record<string, string>,
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
    return this.instance.get("UserOccupationList", {
      searchParams: request as unknown as Record<string, string>,
    }).json();
  }

  updateUser(
    userId: string,
    request: UpdateUserRequest,
  ): Promise<UpdateUserResponse> {
    const formData = toFormData(request as Record<string, unknown>);

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
    return this.instance.get(`${userId}/search`, {
      searchParams: request as unknown as Record<string, string>,
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
