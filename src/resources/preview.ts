import type { AxiosInstance } from "axios";
import type { ApiSuccess, ProxyNode, ProxyTarget } from "../types";
import type { Collection } from "./collections";
import type { SubStoreFile } from "./files";
import type { Subscription } from "./subscriptions";

export type ProxyPreviewResult = { original: ProxyNode[]; processed: ProxyNode[] };
export type FilePreviewResult = { original: string; processed: string };
export const createPreviewApi = (instance: AxiosInstance) => {
  return {
    subscription: (subscription: Subscription, target: ProxyTarget = "JSON") => {
      return instance.post<ApiSuccess<ProxyPreviewResult>>("/api/preview/sub", subscription, {
        params: { target }
      });
    },
    collection: (collection: Collection) => {
      return instance.post<ApiSuccess<ProxyPreviewResult>>("/api/preview/collection", collection);
    },
    file: (file: SubStoreFile) => {
      return instance.post<ApiSuccess<FilePreviewResult>>("/api/preview/file", file);
    }
  };
};
