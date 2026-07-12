import type { AxiosInstance } from "axios";
import type { ApiSuccess, JsonObject } from "../types";

export type StorageBackup = JsonObject & { settings: JsonObject };
export const createStorageApi = (instance: AxiosInstance) => {
  return {
    downloadBackup: () => instance.get<StorageBackup>("/api/storage"),
    restoreBackup: (content: string) => {
      return instance.post<ApiSuccess>("/api/storage", { content });
    },
    restoreBackupObject: (content: StorageBackup) => {
      return instance.post<ApiSuccess>("/api/storage", { content: JSON.stringify(content) });
    }
  };
};
