import axios, { type AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL ?? "http://localhost:5000/api/v1",
  headers: { "Content-Type": "application/json" },
});

export async function makeRequest(
  url: string,
  options: AxiosRequestConfig = {},
  authenticated = false
): Promise<any> {
  try {
    const config: AxiosRequestConfig = { url, ...options };

    if (authenticated) {
      const token = localStorage.getItem("auth_token");
      if (token)
        config.headers = {
          ...(config.headers ?? {}),
          Authorization: `Bearer ${token}`,
        };
    }

    const res = await api.request(config);
    return res.data;
  } catch (err: any) {
    const message = err?.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
}
