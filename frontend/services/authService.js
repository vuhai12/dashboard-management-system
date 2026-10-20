import api from "@/lib/axios";

export async function login(data) {
  const response = await api.post("/auth/login", {
    username: data.username,
    password: data.password,
  });
  return response.data;
}

export const logoutApi = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
