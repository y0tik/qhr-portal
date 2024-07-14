import { API_ENDPOINT } from "./helper.server";

class API {
  baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async handleResponse<T>(
    response: Response
  ): Promise<{ response: T; error: string | undefined }> {
    if (!response.ok) {
      let errorBody: string;
      try {
        errorBody = await response.text(); // Attempt to read response body
      } catch {
        errorBody = "Could not read response body"; // Fallback message
      }
      console.error(
        `Request failed: HTTP error! status: ${response.status}, body: ${errorBody}`
      );
      return {
        response: {} as T,
        error: `HTTP error! status: ${response.status}`,
      };
    }
    const res: T = await response.json();
    return { response: res, error: undefined };
  }

  async get<T>(
    endpoint: string
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("GET request failed:", error);
      return { response: {} as T, error: "Network error" };
    }
  }

  async post<T>(
    endpoint: string,
    data: object
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await this.handleResponse<T>(res);
    } catch (error) {
      console.error("POST request failed:", error);
      return { response: {} as T, error: "Network error" };
    }
  }

  async put<T>(
    endpoint: string,
    data: object
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await this.handleResponse<T>(res);
    } catch (error) {
      console.error("PUT request failed:", error);
      return { response: {} as T, error: "Network error" };
    }
  }

  async delete<T>(
    endpoint: string
  ): Promise<{ response: T; error: string | undefined }> {
    try {
      const res = await fetch(`${this.baseURL}${endpoint}`, {
        method: "DELETE",
      });
      return await this.handleResponse<T>(res);
    } catch (error) {
      console.error("DELETE request failed:", error);
      return { response: {} as T, error: "Network error" };
    }
  }
}

const api = new API(API_ENDPOINT);
export default api;
