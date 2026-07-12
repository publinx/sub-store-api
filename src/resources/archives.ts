import type { AxiosInstance } from "axios";
import type { ApiSuccess } from "../types";
import type { Artifact } from "./artifacts";
import type { Collection } from "./collections";
import type { SubStoreFile } from "./files";
import type { Subscription } from "./subscriptions";
import type { ShareToken, ShareType } from "./tokens";

export type ArchiveItemType = "sub" | "col" | "file" | "artifact" | "share";
export type ArchiveSnapshot = Subscription | Collection | SubStoreFile | Artifact | ShareToken;
export type ArchiveEntry = {
  id: string;
  archivedAt: number;
  itemType: ArchiveItemType;
  name: string;
  displayName?: string;
  remark?: string;
  tag?: string[];
  shareType?: ShareType;
  snapshot: ArchiveSnapshot;
};
export const createArchivesApi = (instance: AxiosInstance) => {
  return {
    list: () => instance.get<ApiSuccess<ArchiveEntry[]>>("/api/archives"),
    get: (id: string) => {
      const path = `/api/archives/${encodeURIComponent(id)}`;
      return instance.get<ApiSuccess<ArchiveEntry>>(path);
    },
    delete: (id: string) => {
      const path = `/api/archives/${encodeURIComponent(id)}`;
      return instance.delete<ApiSuccess<ArchiveEntry>>(path);
    },
    restoreItem: <T extends ArchiveSnapshot = ArchiveSnapshot>(id: string) => {
      const path = `/api/archives/${encodeURIComponent(id)}/restore`;
      return instance.post<ApiSuccess<T>>(path);
    }
  };
};
