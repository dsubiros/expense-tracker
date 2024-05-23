import apiClient from "./apiClient";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;
  
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();

    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  deleteOne<T>(id: number) {
    const controller = new AbortController();

    const request = apiClient.delete(`/${this.endpoint}/${id}`, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  saveOne<T extends Entity>(item: T) {
    const controller = new AbortController();
    const options = { signal: controller.signal };

    const request = item.id
      ? apiClient.patch(`/${this.endpoint}/${item.id}`, item, options)
      : apiClient.post(this.endpoint, options);

    return { request, cancel: () => controller.abort() };
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;