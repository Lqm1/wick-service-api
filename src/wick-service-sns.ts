import { WickServiceBase } from "./wick-service-base.ts";
import type {
  CreatePostRequest,
  CreatePostResponse,
  FavoriteRequest,
  FavoriteResponse,
  GetPostDetailRequest,
  GetPostDetailResponse,
  GetPostsRequest,
  GetPostsResponse,
  GetUserPostsRequest,
  GetUserPostsResponse,
  SearchRequest,
  SearchResponse,
  TrendPostsRequest,
  TrendPostsResponse,
} from "./types.ts";
import { PROD_API_WICK_SERVICE_URL } from "./constants.ts";

export class WickServiceSNS {
  constructor(private readonly instance: WickServiceBase["instance"]) {
    const snsUrl = new URL("/sns", PROD_API_WICK_SERVICE_URL);
    this.instance = this.instance.extend({
      prefixUrl: snsUrl.toString(),
    });
  }

  createPost(request: CreatePostRequest): Promise<CreatePostResponse> {
    const formData = new FormData();

    if (request.body !== undefined) {
      formData.append("body", request.body);
    }
    formData.append("userId", request.userId);
    if (request.replyToPostId !== undefined) {
      formData.append("replyToPostId", request.replyToPostId);
    }
    if (request.repostToPostId !== undefined) {
      formData.append("repostToPostId", request.repostToPostId);
    }
    formData.append("hasPostMemory", String(request.hasPostMemory));
    formData.append("isUseAI", String(request.isUseAI));
    formData.append("isSensitive", String(request.isSensitive));
    formData.append("needMonetization", String(request.needMonetization));

    if (request.images && request.images.length > 0) {
      request.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    if (request.videos && request.videos.length > 0) {
      request.videos.forEach((video) => {
        formData.append("videos", video);
      });
    }

    return this.instance.post("post", {
      body: formData,
    }).json();
  }

  favorite(request: FavoriteRequest): Promise<FavoriteResponse> {
    return this.instance.post("favorite", {
      json: request,
    }).json();
  }

  trendPosts(request: TrendPostsRequest): Promise<TrendPostsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("trend", request.trend);
    searchParams.append("limit", String(request.limit));
    if (request.cursor !== undefined) {
      searchParams.append("cursor", request.cursor);
    }

    return this.instance.get("trendPosts", {
      searchParams,
    }).json();
  }

  getPosts(request: GetPostsRequest): Promise<GetPostsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", request.userId);
    searchParams.append("type", request.type);
    if (request.keyword !== undefined) {
      searchParams.append("keyword", request.keyword);
    }
    if (request.followPostCursor !== undefined) {
      searchParams.append("followPostCursor", request.followPostCursor);
    }
    if (request.highFollowerCursor !== undefined) {
      searchParams.append("highFollowerCursor", request.highFollowerCursor);
    }

    return this.instance.get("post", {
      searchParams,
    }).json();
  }

  getPostDetail(request: GetPostDetailRequest): Promise<GetPostDetailResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", request.userId);
    searchParams.append("postId", request.postId);

    return this.instance.get("postDetail", {
      searchParams,
    }).json();
  }

  getUserPosts(request: GetUserPostsRequest): Promise<GetUserPostsResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", request.userId);
    if (request.cursor !== undefined) {
      searchParams.append("cursor", request.cursor);
    }
    searchParams.append("limit", String(request.limit));
    searchParams.append("type", request.type);
    if (request.memoryId !== undefined) {
      searchParams.append("memoryId", request.memoryId);
    }

    return this.instance.get("userPosts", {
      searchParams,
    }).json();
  }

  search(request: SearchRequest): Promise<SearchResponse> {
    const searchParams = new URLSearchParams();
    searchParams.append("userId", request.userId);
    searchParams.append("offset", String(request.offset));
    searchParams.append("keyword", request.keyword);
    searchParams.append("type", request.type);

    return this.instance.get("search", {
      searchParams,
    }).json();
  }
}
