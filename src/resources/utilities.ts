import type { AxiosInstance } from "axios";
import type { AgeKeyType, ApiSuccess, JsonObject } from "../types";

export type RuntimeEnvironment = {
  guide: string;
  backend: string;
  version: string;
  feature: Record<string, boolean>;
  meta: JsonObject;
};
export type NodeInfoRequest = { server: string; [key: string]: unknown };
export type NodeInfo = { shareUrl?: string; info: JsonObject };
export type AgeKeyPair = { type: AgeKeyType; "age-secret-key": string; "age-public-key": string };
export type BackupEncoding = "base64" | "plaintext" | "age";
export type BackupOptions = { encode?: BackupEncoding };
export type DownloadBackupOptions = BackupOptions & { keep?: string };
export type EnvironmentOptions = { share?: true };
export type NodeInfoOptions = { language?: string };
export const createUtilitiesApi = (instance: AxiosInstance) => {
  return {
    getEnvironment: (options?: EnvironmentOptions) => {
      return instance.get<ApiSuccess<RuntimeEnvironment>>("/api/utils/env", { params: options });
    },
    refreshCaches: () => instance.get<ApiSuccess>("/api/utils/refresh"),
    uploadBackup: (options?: BackupOptions) => {
      return instance.get<ApiSuccess>("/api/utils/backup", {
        params: { action: "upload", ...options }
      });
    },
    downloadBackup: (options?: DownloadBackupOptions) => {
      return instance.get<ApiSuccess>("/api/utils/backup", {
        params: { action: "download", ...options }
      });
    },
    getNodeInfo: (proxy: NodeInfoRequest, options?: NodeInfoOptions) => {
      return instance.post<ApiSuccess<NodeInfo>>("/api/utils/node-info", proxy, {
        params: { lang: options?.language }
      });
    },
    generateAgeKeyPair: (type: AgeKeyType = "x25519") => {
      return instance.post<ApiSuccess<AgeKeyPair>>("/api/utils/age/key-pair", { type });
    },
    deriveAgePublicKey: (secretKey: string) => {
      return instance.post<ApiSuccess<{ "age-public-key": string }>>("/api/utils/age/public-key", {
        "age-secret-key": secretKey
      });
    }
  };
};
