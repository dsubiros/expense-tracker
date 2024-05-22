import apiClient from "./apiClient";

export interface User {
  id: number;
  name: string;
}

class UserService {
  getAll() {
    const controller = new AbortController();

    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  deleteOne(id: number) {
    const controller = new AbortController();

    const request = apiClient.delete(`/users/${id}`, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  saveOne(user: User) {
    const controller = new AbortController();
    const options = {signal: controller.signal};

    // const call = data.id ? apiClient.patch : apiClient.post;
    const request = user.id
      ? apiClient.patch(`/users/${user.id}`, user, options)
      : apiClient.post("/users", options);

    return { request, cancel: () => controller.abort() };
  }
}

export default new UserService();
