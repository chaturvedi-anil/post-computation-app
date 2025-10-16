import { makeRequest } from "../services/makeRequest";

export const login = async (body: {
  username: string;
  password: string;
}): Promise<{ data: any }> => {
  const res = await makeRequest("/login", { method: "POST", data: body }, true);
  if (res.success) {
    localStorage.setItem("auth_token", res.data.token);
  }
  return res;
};

export const register = async (body: {
  username: string;
  password: string;
}): Promise<{ data: any }> => {
  const res = await makeRequest(
    "/register",
    { method: "POST", data: body },
    true
  );
  if (res.success) {
    localStorage.setItem("auth_token", res.data.token);
  }
  return res;
};

export const fetchMe = async (): Promise<{ data: any }> => {
  const res = await makeRequest("/me", { method: "GET" }, true);
  if (res.success) {
    localStorage.setItem("userame", res.data.user.username);
  }
  return res;
};
