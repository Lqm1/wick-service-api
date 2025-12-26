import ky from "ky";
import { ProxyAgent } from "undici";
import { Cookie, CookieJar } from "tough-cookie";
import { PROD_API_WICK_SERVICE_URL } from "./constants.ts";
import { detectRuntime } from "./utils.ts";
import { WickServiceError } from "./errors.ts";

export class WickServiceBase {
  protected cookieJar = new CookieJar();
  protected instance = ky.create({
    prefixUrl: PROD_API_WICK_SERVICE_URL.toString(),
    headers: {
      "user-agent": "Dart/3.9 (dart:io)",
      "content-type": "application/json; charset=UTF-8",
    },
    hooks: {
      beforeRequest: [
        async (request) => {
          const cookieString = await this.cookieJar.getCookieString(
            request.url,
          );
          if (cookieString) {
            request.headers.set("Cookie", cookieString);
          }
        },
      ],
      afterResponse: [
        async (request, _options, response) => {
          const setCookies = response.headers.getSetCookie();
          for (const cookieStr of setCookies) {
            const cookie = Cookie.parse(cookieStr);
            if (!cookie) continue;
            await this.cookieJar.setCookie(cookie, request.url);
          }
        },
      ],
      beforeError: [
        async (error) => {
          const message = await error.response.json<{
            data: Record<PropertyKey, never>;
            hasNext: false;
            offset: 0;
            cursor: "";
            message: string;
          }>().then((body) => body.message).catch(() =>
            "未知の問題が発生しました。"
          );
          return new WickServiceError(
            error.response,
            error.request,
            error.options,
            message,
          );
        },
      ],
    },
  });

  constructor(proxyUrl?: string) {
    if (proxyUrl) {
      const runtime = detectRuntime();
      switch (runtime) {
        case "deno": {
          const client = Deno.createHttpClient({
            proxy: {
              url: proxyUrl,
            },
          });
          this.instance = ky.extend({
            // @ts-expect-error - client is not in the type definition, but it's passed through to fetch.
            client,
          });
          break;
        }
        case "bun": {
          this.instance = ky.extend({
            // @ts-expect-error - proxy is not in the type definition, but it's passed through to fetch.
            proxy: proxyUrl,
          });
          break;
        }
        case "node": {
          const proxyAgent = new ProxyAgent(proxyUrl);
          this.instance = ky.extend({
            // @ts-expect-error - dispatcher is not in the type definition, but it's passed through to fetch.
            dispatcher: proxyAgent,
          });
          break;
        }
        case "unknown": {
          throw new Error(
            "Unknown runtime detected. Cannot set up proxy.",
          );
        }
      }
    }
  }
}
