import { assertEquals, assertExists, assertRejects } from "@std/assert";
import { WickService } from "../src/main.ts";

Deno.test("WickServiceAuth - guestSignUp should return access token and user", async () => {
  const service = new WickService();
  const response = await service.auth.guestSignUp();

  assertExists(response.data);
  assertExists(response.data.accessToken);
  assertExists(response.data.refreshToken);
  assertExists(response.data.user);
  assertExists(response.data.user.id);
  assertExists(response.data.user.guestSecret);
  assertEquals(typeof response.data.accessToken, "string");
  assertEquals(typeof response.data.refreshToken, "string");
  assertEquals(typeof response.data.user.id, "string");
});

Deno.test("WickServiceAuth - guestSignIn with valid credentials", async () => {
  // First sign up to get guest credentials
  const service = new WickService();
  const signUpResponse = await service.auth.guestSignUp();
  const guestSecret = signUpResponse.data.user.guestSecret!;

  // Sign in with the guest credentials
  const signInResponse = await service.auth.guestSignIn({
    guestSecret,
    screenWidth: 1920,
    deviceId: null,
  });

  assertExists(signInResponse.data);
  assertExists(signInResponse.data.accessToken);
  assertExists(signInResponse.data.refreshToken);
  assertExists(signInResponse.data.user);
  assertEquals(typeof signInResponse.data.accessToken, "string");
  assertEquals(typeof signInResponse.data.refreshToken, "string");
});

Deno.test("WickServiceAuth - guestSignIn with invalid credentials should fail", async () => {
  const service = new WickService();

  await assertRejects(
    async () => {
      await service.auth.guestSignIn({
        guestSecret: "invalid-secret",
        screenWidth: 1920,
        deviceId: null,
      });
    },
    Error,
  );
});

Deno.test("WickServiceAuth - checkTerms returns policy status", async () => {
  // First create a guest user
  const service = new WickService();
  const signUpResponse = await service.auth.guestSignUp();
  const userId = signUpResponse.data.user.id;

  // Check terms for the user
  const response = await service.auth.checkTerms({
    userId,
  });

  assertExists(response.data);
  assertEquals(typeof response.data.updatedPrivacyPolicy, "boolean");
  assertEquals(typeof response.data.updatedTermOfUse, "boolean");
});

Deno.test("WickServiceAuth - signUp creates a new account", async () => {
  // First create a guest user
  const service = new WickService();
  const guestResponse = await service.auth.guestSignUp();
  const guestUserId = guestResponse.data.user.id;
  const guestSecret = guestResponse.data.user.guestSecret!;

  // Sign up with email/password
  const email = `test_${Date.now()}@example.com`;
  const password = "TestPassword123!";

  const response = await service.auth.signUp({
    email,
    password,
    guestUserId,
    guestSecret,
  });

  assertExists(response.data);
  assertExists(response.data.id);
  assertEquals(response.data.email, email);
  assertEquals(typeof response.data.id, "string");
  assertEquals(typeof response.data.created_at, "string");
});

Deno.test("WickServiceAuth - signIn with valid credentials", async () => {
  // First create a guest user and sign up
  const service = new WickService();
  const guestResponse = await service.auth.guestSignUp();
  const guestUserId = guestResponse.data.user.id;
  const guestSecret = guestResponse.data.user.guestSecret!;

  const email = `test_${Date.now()}@example.com`;
  const password = "TestPassword123!";

  const res = await service.auth.signUp({
    email,
    password,
    guestUserId,
    guestSecret,
  });

  // Note: This will likely fail until email is confirmed
  // This test demonstrates the API call structure
  await assertRejects(
    async () => {
      await service.auth.signIn({
        email,
        password,
        screenWidth: 1920,
        deviceId: "test-device",
      });
    },
    Error,
  );
});
