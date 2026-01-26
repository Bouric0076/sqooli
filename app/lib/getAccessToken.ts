export async function getAccessToken(): Promise<string | undefined> {
    // 🖥 CLIENT SIDE
    if (typeof window !== "undefined") {
      const Cookies = (await import("js-cookie")).default;
      return Cookies.get("access_token");
    }
  
    // 🧠 SERVER SIDE
    const { cookies } = await import("next/headers");
    return (await cookies()).get("access_token")?.value;
  }
  
  export async function deleteAuthTokens(): Promise<void> {
    if (typeof window !== "undefined") {
      const Cookies = (await import("js-cookie")).default;
  
      Cookies.remove("access_token", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
  
      return;
    }
  
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
  
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");
  }
  
  