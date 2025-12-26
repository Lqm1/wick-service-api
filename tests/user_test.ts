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

Deno.test("WickServiceUser - versions returns version information", async () => {
  const response = await service.user.versions();

  assertExists(response);
  assertExists(response.data);
});

Deno.test("WickServiceUser - unreadTabs returns notification status", async () => {
  const response = await service.user.unreadTabs();

  assertExists(response);
  assertExists(response.data);
});

Deno.test("WickServiceUser - userDetail returns user information", async () => {
  const response = await service.user.userDetail(userId);

  assertExists(response);
  assertExists(response.data);
  assertEquals(response.data.id, userId);
});

Deno.test("WickServiceUser - updateUser updates user information", async () => {
  const response = await service.user.updateUser(userId, {
    nickname: `TestUser_${Date.now()}`,
    username: `testuser_${Date.now()}`,
    biography: "Test biography",
  });

  assertExists(response);
  assertExists(response.data);
});

Deno.test("WickServiceUser - userOccupationList returns occupation list", async () => {
  const response = await service.user.userOccupationList({
    excludeEmpty: true,
    sortByCount: true,
  });

  assertExists(response);
  assertExists(response.data);
});

Deno.test("WickServiceUser - searchUsers returns user search results", async () => {
  const response = await service.user.searchUsers(userId, {
    keyword: "test",
    userId: userId,
    offset: 0,
  });

  assertExists(response);
  assertExists(response.data);
});
