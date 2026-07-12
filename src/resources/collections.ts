import type { AxiosInstance } from "axios";
import type {
  ApiSuccess,
  DeleteOptions,
  IgnoreFailedRemoteSubMode,
  ProcessItem,
  ResourceBase
} from "../types";

export type Collection = ResourceBase & {
  subscriptions: string[];
  subscriptionTags?: string[];
  proxy?: string;
  ignoreFailedRemoteSub?: IgnoreFailedRemoteSubMode;
  firstSubFlow?: boolean;
  subUserinfo?: string;
};
export type CollectionUpdate = Partial<Omit<Collection, "process">> & { process?: ProcessItem[] };
export const createCollectionsApi = (instance: AxiosInstance) => {
  return {
    list: () => instance.get<ApiSuccess<Collection[]>>("/api/collections"),
    create: (collection: Collection) => {
      return instance.post<ApiSuccess<Collection>>("/api/collections", collection);
    },
    replaceAll: (collections: Collection[]) => {
      return instance.put<ApiSuccess>("/api/collections", collections);
    },
    get: (name: string) => {
      const path = `/api/collection/${encodeURIComponent(name)}`;
      return instance.get<ApiSuccess<Collection>>(path);
    },
    downloadConfig: (name: string) => {
      const path = `/api/collection/${encodeURIComponent(name)}`;
      return instance.get<Collection>(path, { params: { raw: 1 } });
    },
    update: (name: string, collection: CollectionUpdate) => {
      const path = `/api/collection/${encodeURIComponent(name)}`;
      return instance.patch<ApiSuccess<Collection>>(path, collection);
    },
    delete: (name: string, options?: DeleteOptions) => {
      const path = `/api/collection/${encodeURIComponent(name)}`;
      return instance.delete<ApiSuccess>(path, { params: options });
    }
  };
};
