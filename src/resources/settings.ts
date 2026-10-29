import type { AxiosInstance } from "axios";
import type { ApiSuccess } from "../types";

export type GistDownloadTokenStrategy = "ask" | "overwrite" | "keep";
export type GistUploadEncoding = "base64" | "plaintext" | "age";
export type AppearanceSettings = {
  createItemPosition?: "top" | "bottom";
  invalidShareFakeNode?: boolean;
  [key: string]: unknown;
};
export type Settings = {
  gistToken?: string;
  syncPlatform?: "gitlab" | (string & {});
  gistUpload?: GistUploadEncoding;
  gistDownloadTokenStrategy?: GistDownloadTokenStrategy;
  "age-secret-key"?: string;
  githubUser?: string;
  githubProxy?: string;
  githubProxyRegex?: string;
  githubApiUrl?: string;
  defaultProxy?: string;
  defaultUserAgent?: string;
  defaultFlowUserAgent?: string;
  defaultTimeout?: number;
  githubApiTimeout?: number;
  artifactSyncBatchSize?: number;
  cacheThreshold?: number;
  resourceCacheTtl?: number;
  headersCacheTtl?: number;
  scriptCacheTtl?: number;
  logsMaxCount?: number;
  backendRequestConcurrency?: number;
  backendRequestConcurrencyWaitTime?: number;
  appearanceSetting?: AppearanceSettings;
  artifactStore?: string;
  artifactStoreStatus?: string;
  syncTime?: number;
  [key: string]: unknown;
};
export const createSettingsApi = (instance: AxiosInstance) => {
  return {
    get: () => instance.get<ApiSuccess<Settings>>("/api/settings"),
    update: (settings: Partial<Settings>) => {
      return instance.patch<ApiSuccess<Settings>>("/api/settings", settings);
    }
  };
};
