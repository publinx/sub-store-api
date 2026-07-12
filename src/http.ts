import axios, { type AxiosRequestConfig } from "axios";

export type HttpOptions = {
  baseURL?: string;
  timeout?: number;
  headers?: AxiosRequestConfig["headers"];
};

export const createHttp = (options?: HttpOptions) => {
  const instance = axios.create({
    baseURL: options?.baseURL || "http://127.0.0.1:3000",
    timeout: options?.timeout,
    headers: options?.headers
  });
  return instance;
};
