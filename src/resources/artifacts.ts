import type { AxiosInstance } from "axios";
import type { ApiSuccess, DeleteOptions, ProxyTarget, ResourceBase } from "../types";

export type ArtifactType = "subscription" | "sub" | "collection" | "col" | "file";
export type Artifact = ResourceBase & {
  type?: ArtifactType;
  source?: string;
  platform?: ProxyTarget;
  sync?: boolean;
  upload?: boolean;
  includeUnsupportedProxy?: boolean;
  prettyYaml?: boolean;
  cron?: string;
  updated?: number;
  url?: string;
};
export type ArtifactCreate = Artifact & {
  type: ArtifactType;
  source: string;
  platform: ProxyTarget;
};
export type ArtifactUpdate = Partial<Artifact>;
export type ArtifactRemoteDeleteResult = {
  attempted: boolean;
  status: "not_attempted" | "deleted" | "placeholder_retained" | "failed";
  message?: string;
  placeholderFilename?: string;
};
export type ArtifactDeleteResult = { artifact: Artifact; remote: ArtifactRemoteDeleteResult };
export const createArtifactsApi = (instance: AxiosInstance) => {
  return {
    list: () => instance.get<ApiSuccess<Artifact[]>>("/api/artifacts"),
    create: (artifact: ArtifactCreate) => {
      return instance.post<ApiSuccess<Artifact>>("/api/artifacts", artifact);
    },
    replaceAll: (artifacts: ArtifactCreate[]) => {
      return instance.put<ApiSuccess>("/api/artifacts", artifacts);
    },
    get: (name: string) => {
      const path = `/api/artifact/${encodeURIComponent(name)}`;
      return instance.get<ApiSuccess<Artifact>>(path);
    },
    update: (name: string, artifact: ArtifactUpdate) => {
      const path = `/api/artifact/${encodeURIComponent(name)}`;
      return instance.patch<ApiSuccess<Artifact>>(path, artifact);
    },
    delete: (name: string, options?: DeleteOptions) => {
      const path = `/api/artifact/${encodeURIComponent(name)}`;
      return instance.delete<ApiSuccess<ArtifactDeleteResult>>(path, { params: options });
    },
    restoreFromRemote: () => instance.get<ApiSuccess>("/api/artifacts/restore"),
    syncAll: () => instance.get<ApiSuccess>("/api/sync/artifacts"),
    syncOne: (name: string) => {
      const path = `/api/sync/artifact/${encodeURIComponent(name)}`;
      return instance.get<ApiSuccess<Artifact>>(path);
    }
  };
};
