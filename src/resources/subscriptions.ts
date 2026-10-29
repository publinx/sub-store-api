import type { AxiosInstance } from "axios";
import type {
  ApiSuccess,
  DeleteOptions,
  EditorLanguage,
  FlowInfo,
  IgnoreFailedRemoteSubMode,
  MergeSources,
  ProcessItem,
  ResourceBase
} from "../types";

export type Subscription = ResourceBase & {
  source: "local" | "remote";
  url?: string;
  content?: string;
  ua?: string;
  proxy?: string;
  mergeSources?: MergeSources;
  ignoreFailedRemoteSub?: IgnoreFailedRemoteSubMode;
  passThroughUA?: boolean;
  noCache?: boolean;
  noFlow?: boolean;
  subUserinfo?: string;
};
export type SubscriptionUpdate = Partial<
  Omit<Subscription, "process" | "editorLanguage" | "previewLanguage">
> & { process?: ProcessItem[]; editorLanguage?: EditorLanguage; previewLanguage?: EditorLanguage };
export type FlowQuery = { url?: string; noFlow?: boolean };
export const createSubscriptionsApi = (instance: AxiosInstance) => {
  return {
    list: () => instance.get<ApiSuccess<Subscription[]>>("/api/subs"),
    create: (subscription: Subscription) => {
      return instance.post<ApiSuccess<Subscription>>("/api/subs", subscription);
    },
    replaceAll: (subscriptions: Subscription[]) => {
      return instance.put<ApiSuccess>("/api/subs", subscriptions);
    },
    get: (name: string) => {
      const path = `/api/sub/${encodeURIComponent(name)}`;
      return instance.get<ApiSuccess<Subscription>>(path);
    },
    downloadConfig: (name: string) => {
      const path = `/api/sub/${encodeURIComponent(name)}`;
      return instance.get<Subscription>(path, { params: { raw: 1 } });
    },
    update: (name: string, subscription: SubscriptionUpdate) => {
      const path = `/api/sub/${encodeURIComponent(name)}`;
      return instance.patch<ApiSuccess<Subscription>>(path, subscription);
    },
    delete: (name: string, options?: DeleteOptions) => {
      const path = `/api/sub/${encodeURIComponent(name)}`;
      return instance.delete<ApiSuccess>(path, { params: options });
    },
    getFlowInfo: (name: string, query?: FlowQuery) => {
      const path = `/api/sub/flow/${encodeURIComponent(name)}`;
      return instance.get<ApiSuccess<FlowInfo>>(path, { params: query });
    }
  };
};
