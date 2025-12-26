import { assertEquals, assertExists } from "@std/assert";
import { WickService } from "../src/main.ts";

// Create a guest user once for all tests
const service = new WickService();
const authResponse = await service.auth.guestSignUp();
const guestSecret = authResponse.data.user.guestSecret!;
const userId = authResponse.data.user.id;

// Sign in with the guest credentials
await service.auth.guestSignIn({
  guestSecret,
  screenWidth: 1920,
  deviceId: null,
});

Deno.test("WickServiceSNS - createPost creates a new post", async () => {
  const response = await service.sns.createPost({
    body: `Test post created at ${Date.now()}`,
    userId: userId,
    hasPostMemory: false,
    isUseAI: false,
    isSensitive: false,
    needMonetization: false,
  });

  assertExists(response);
  assertExists(response.data);
  assertExists(response.data.id);
  assertEquals(typeof response.data.id, "string");
});

Deno.test("WickServiceSNS - getPosts returns posts list", async () => {
  const response = await service.sns.getPosts({
    userId: userId,
    type: "follow",
  });

  assertExists(response);
  assertExists(response.data);
});

Deno.test("WickServiceSNS - getUserPosts returns user's posts", async () => {
  const response = await service.sns.getUserPosts({
    userId: userId,
    limit: 10,
    type: "post",
  });

  assertExists(response);
  assertExists(response.data);
});

Deno.test("WickServiceSNS - trendPosts returns trending posts", async () => {
  const response = await service.sns.trendPosts({
    trend: "today",
    limit: 10,
  });

  assertExists(response);
  assertExists(response.data);
});

Deno.test("WickServiceSNS - getPostDetail returns post details", async () => {
  // Create a post first
  const createResponse = await service.sns.createPost({
    body: `Test post for detail at ${Date.now()}`,
    userId: userId,
    hasPostMemory: false,
    isUseAI: false,
    isSensitive: false,
    needMonetization: false,
  });

  const postId = createResponse.data.id;

  // Get the post detail
  const response = await service.sns.getPostDetail({
    userId: userId,
    postId: postId,
  });

  assertExists(response);
  assertExists(response.data);
  assertEquals(response.data.id, postId);
});

Deno.test("WickServiceSNS - search returns search results", async () => {
  const response = await service.sns.search({
    userId: userId,
    offset: 0,
    keyword: "test",
    type: "post",
  });

  assertExists(response);
  assertExists(response.data);
});
