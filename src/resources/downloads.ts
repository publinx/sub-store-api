import type { AxiosInstance } from "axios";
import type {
  IgnoreFailedRemoteSubMode,
  MergeSources,
  ProduceType,
  ProxyTarget,
  RuntimeOptions
} from "../types";
import type { FileRenderQuery } from "./files";

export type CommonDownloadQuery = {
  platform?: ProxyTarget;
  produceType?: ProduceType;
  includeUnsupportedProxy?: true;
  prettyYaml?: true;
  "pretty-yaml"?: true;
  proxy?: string;
  noCache?: true;
  noFlow?: true;
  ignoreFailedRemoteSub?: Exclude<IgnoreFailedRemoteSubMode, false>;
  $options?: RuntimeOptions;
  mihomoExternal?: string;
  mihomoMerge?: true;
  mihomoMergeName?: string;
  mihomoLocalPort?: number;
};
export type SubscriptionDownloadQuery = CommonDownloadQuery & {
  url?: string;
  content?: string;
  ua?: string;
  mergeSources?: MergeSources;
  fakeSub?: true;
};
export type ShareDownloadQuery = CommonDownloadQuery & { token?: string };
export type FileShareOptions = Pick<
  FileRenderQuery,
  | "ua"
  | "proxy"
  | "noCache"
  | "noFlow"
  | "produceType"
  | "download"
  | "$options"
  | "ignoreFailedRemoteFile"
  | "includeUnsupportedProxy"
  | "subInfoUserAgent"
> & { token?: string };
export type DownloadSubscriptionRequest = {
  name: string;
  target?: ProxyTarget;
  options?: SubscriptionDownloadQuery;
};
export type DownloadCollectionRequest = {
  name: string;
  target?: ProxyTarget;
  options?: CommonDownloadQuery;
};
export type ShareResourceRequest = {
  name: string;
  target?: ProxyTarget;
  options?: ShareDownloadQuery;
};
export type ShareFileRequest = { name: string; options?: FileShareOptions };
const targetPath = (base: string, target?: ProxyTarget) => {
  return target === undefined ? base : `${base}/${encodeURIComponent(target)}`;
};
export const createDownloadsApi = (instance: AxiosInstance) => {
  return {
    subscription: <T = string | unknown[]>({
      name,
      target,
      options
    }: DownloadSubscriptionRequest) => {
      const path = targetPath(`/download/${encodeURIComponent(name)}`, target);
      return instance.get<T>(path, { params: options });
    },
    collection: <T = string | unknown[]>({ name, target, options }: DownloadCollectionRequest) => {
      const path = targetPath(`/download/collection/${encodeURIComponent(name)}`, target);
      return instance.get<T>(path, { params: options });
    },
    sharedSubscription: <T = string | unknown[]>({
      name,
      target,
      options
    }: ShareResourceRequest) => {
      const path = targetPath(`/share/sub/${encodeURIComponent(name)}`, target);
      return instance.get<T>(path, { params: options });
    },
    sharedCollection: <T = string | unknown[]>({ name, target, options }: ShareResourceRequest) => {
      const path = targetPath(`/share/col/${encodeURIComponent(name)}`, target);
      return instance.get<T>(path, { params: options });
    },
    sharedFile: ({ name, options }: ShareFileRequest) => {
      const path = `/share/file/${encodeURIComponent(name)}`;
      return instance.get<string>(path, { params: options });
    }
  };
};
