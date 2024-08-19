import { redirect } from "@remix-run/react";
import { sessionStore } from "./session.server";
import { env } from "~/env.server";

class API {
  baseURL: string;
  accessToken: string;
  request: Request | null;

  constructor(baseURL: string, accessToken: string, request: Request | null) {
    this.baseURL = baseURL;
    this.accessToken = accessToken;
    this.request = request;
  }

  checkIfUnauthorized = async (error: string) => {
    if (!this.request) return;
    if (error.includes("401")) {
      throw redirect(
        `/login?code=207H2L&callbackUrl=${encodeURIComponent(this.request.url)}`,
        {
          headers: {
            "Set-Cookie": await sessionStore.destroySession(
              await sessionStore.getSession(this.request.headers.get("Cookie")),
            ),
          },
        },
      );
    }
  };

  private async handleResponse<T>(
    response: Response,
  ): Promise<{ response: T; error: string | undefined }> {
    if (!response.ok) {
      let errorBody: string;
      try {
        errorBody = await response.text(); // Attempt to read response body
      } catch {
        errorBody = "Could not read response body"; // Fallback message
      }
      console.error(
        `Request failed: HTTP error! status: ${response.status}, body: ${errorBody}`,
      );
      throw new Error(
        `Request failed: HTTP error! status: ${response.status}, body: ${errorBody}`,
      );
    }
    const res: T = await response.json();
    return { response: res, error: undefined };
  }

  private getAuthorizationHeader() {
    if (this.accessToken) {
      return { Authorization: `Bearer ${this.accessToken}` };
    }
    return undefined;
  }

  async get<T>(
    endpoint: string,
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: this.getAuthorizationHeader(),
      });
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        await this.checkIfUnauthorized(error.message);
      }
      console.error("GET request failed:", error);
      return { response: {} as T, error: "Network error" };
    }
  }

  async post<T>(
    endpoint: string,
    data: object,
    debug = false,
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const fetchBody = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthorizationHeader(),
        },
        body: JSON.stringify(data),
      };
      if (debug) {
        console.log(
          `Method :: ${fetchBody.method} -> ${this.baseURL}${endpoint}`,
        );
        console.log("fetch_body ", fetchBody);
      }
      const res = await fetch(`${this.baseURL}${endpoint}`, fetchBody);
      return await this.handleResponse<T>(res);
    } catch (error) {
      if (error instanceof Error) {
        await this.checkIfUnauthorized(error.message);
      }
      console.error("POST request failed:");
      return { response: {} as T, error: "Network error" };
    }
  }

  async put<T>(
    endpoint: string,
    data: object,
    debug = false,
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const fetchBody = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthorizationHeader(),
        },
        body: JSON.stringify(data),
      };
      if (debug) {
        console.log(
          `Method :: ${fetchBody.method} -> ${this.baseURL}${endpoint}`,
        );
        console.log("fetch_body ", fetchBody);
      }
      const res = await fetch(`${this.baseURL}${endpoint}`, fetchBody);
      return await this.handleResponse<T>(res);
    } catch (error) {
      if (error instanceof Error) {
        await this.checkIfUnauthorized(error.message);
      }
      console.error("PUT request failed:", error);
      return { response: {} as T, error: "Network error" };
    }
  }

  async delete<T>(
    endpoint: string,
    debug = false,
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const fetchBody = {
        method: "DELETE",
        headers: this.getAuthorizationHeader(),
      };
      if (debug) {
        console.log(
          `Method :: ${fetchBody.method} -> ${this.baseURL}${endpoint}`,
        );
        console.log("fetch_body ", fetchBody);
      }
      const res = await fetch(`${this.baseURL}${endpoint}`, fetchBody);
      return await this.handleResponse<T>(res);
    } catch (error) {
      if (error instanceof Error) {
        await this.checkIfUnauthorized(error.message);
      }
      console.error("DELETE request failed:", error);
      return { response: {} as T, error: "Network error" };
    }
  }
}

// global object
const api = new API(env.ALUMNUX_CORE_ENDPOINT, "", null);
export const createAPIForRequest = (atoken: string, request: Request) =>
  new API(env.ALUMNUX_CORE_ENDPOINT, atoken, request);

export default api;
