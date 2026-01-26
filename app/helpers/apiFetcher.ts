type ApiError = {
  message: string;
  status?: number;
};

export async function apiFetcher<T>(
  url: string,
  options?: RequestInit & { params?: Record<string, any>; body?: any }
): Promise<T> {
  try {
    let finalUrl = url;

    // Append query params if any
    if (options?.params) {
      const query = new URLSearchParams(
        Object.entries(options.params)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => [k, String(v)])
      ).toString();

      if (query) {
        finalUrl += `?${query}`;
      }
    }

    // Make sure body is stringified if it's an object
    let body: string | undefined = undefined;
    if (options?.body !== undefined) {
      body = JSON.stringify(options.body);
    }

    const res = await fetch(finalUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      ...options,
      body, // override body with JSON string
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));

      throw {
        message: errorData.message || "Request failed",
        status: res.status,
      };
    }

    return await res.json();
  } catch (error: any) {
    console.error("API Fetcher error:", error);
    throw {
      message: error.message || "Unexpected error occurred",
      status: error.status || 500,
    };
  }
}
