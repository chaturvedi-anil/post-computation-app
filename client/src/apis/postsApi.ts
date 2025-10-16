import { makeRequest } from "../services/makeRequest";

export const fetchPosts = async (): Promise<{ data: any }> => {
  const res = await makeRequest("/posts", { method: "GET" });
  return res;
};

export const fetchPost = async (id: string): Promise<{ data: any }> => {
  const res = await makeRequest(`/posts/${id}`, { method: "GET" });
  return res.data.post;
};

export const createPost = async (body: {
  value: number;
}): Promise<{ data: any }> => {
  const res = await makeRequest("/posts", { method: "POST", data: body }, true);
  return res;
};

export const deletePost = async (id: string): Promise<{ data: any }> => {
  const res = await makeRequest(`/posts/:${id}`, { method: "DELETE" }, true);
  return res;
};

export const createOperation = async (
  id: string,
  body: {
    parentId?: string;
    operand: number;
    operation: string;
  }
): Promise<{ data: any }> => {
  const res = await makeRequest(
    `/posts/:${id}/operations`,
    { method: "POST", data: body },
    true
  );
  return res;
};
