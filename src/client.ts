import ky, { type KyInstance } from "ky";

export function stripTrailingSlash(url: string): string {
  return url.replace(/\/$/, "");
}

export function createAnonymousClient(baseUrl: string): KyInstance {
  return ky.create({ prefixUrl: stripTrailingSlash(baseUrl) });
}

export function createAuthenticatedClient(baseUrl: string, accessToken: string): KyInstance {
  return ky.create({
    prefixUrl: stripTrailingSlash(baseUrl),
    hooks: {
      beforeRequest: [
        (request) => {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        },
      ],
    },
  });
}
