import ky from "ky";
import { ProxyAgent } from "undici";
import { PROD_API_WICK_SERVICE_URL } from "./constants.ts";
import { detectRuntime } from "./utils.ts";

export class WickService {
  private instance = ky.create({
    prefixUrl: PROD_API_WICK_SERVICE_URL,
    headers: {
      "user-agent": "Dart/3.9 (dart:io)",
      "content-type": "application/json; charset=UTF-8",
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
