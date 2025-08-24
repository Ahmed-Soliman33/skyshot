import { handleApiError } from "./errorHandlers";
import { tokenManager } from "@features/auth/utils/tokenManager";

class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
  }

  async request(endpoint, options = {}, lang = "en") {
    const url = `${this.baseURL}${endpoint}`;
    const token = tokenManager.getAccessToken();

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      credentials: "include",
      ...options,
    };

    if (config.body instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    const normalizeFetchError = async (res) => {
      let data = {};
      try {
        data = await res.json();
      } catch {
        /* ignore */
      }

      return handleApiError(res, data, lang);
    };

    let response = await fetch(url, config);

    // 401 → جرب refresh مرة
    if (response.status === 401) {
      if (
        endpoint === "/auth/login" ||
        endpoint === "/auth/signup" ||
        endpoint === "/auth/refresh-token"
      ) {
        throw await normalizeFetchError(response);
      }
      try {
        tokenManager.setLang(lang);
        const newToken = await tokenManager.refreshAccessToken();
        if (newToken) {
          const retryConfig = {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newToken}`,
            },
          };
          response = await fetch(url, retryConfig);
        }
      } catch {
        tokenManager?.clearTokens();
        throw await normalizeFetchError(response);
      }
    }

    // لو لسه مش OK → ارمي error منسق
    if (!response.ok) {
      throw await normalizeFetchError(response);
    }

    // OK → رجّع الداتا
    return await response.json().catch(() => null);
  }

  async get(endpoint, lang) {
    return this.request(endpoint, {}, lang);
  }

  async post(endpoint, data, lang) {
    return this.request(
      endpoint,
      {
        method: "POST",
        body: data instanceof FormData ? data : JSON.stringify(data),
      },
      lang,
    );
  }

  async put(endpoint, data, lang) {
    return this.request(
      endpoint,
      {
        method: "PUT",
        body: JSON.stringify(data),
      },
      lang,
    );
  }

  async patch(endpoint, data, lang) {
    return this.request(
      endpoint,
      {
        method: "PATCH",
        body: JSON.stringify(data),
      },
      lang,
    );
  }

  async delete(endpoint, lang) {
    return this.request(
      endpoint,
      {
        method: "DELETE",
      },
      lang,
    );
  }
}

export const apiService = new ApiService();
