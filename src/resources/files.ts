import type { AxiosInstance } from "axios";
import type {
  ApiSuccess,
  DeleteOptions,
  IgnoreFailedRemoteFileMode,
  MergeSources,
  ProcessItem,
  ProduceType,
  ResourceBase,
  RuntimeOptions
} from "../types";

export type FileSourceType = "local" | "remote" | "subscription" | "collection" | "none";
export type SubStoreFile = ResourceBase & {
  type?: string;
  source?: "local" | "remote";
  sourceType?: FileSourceType;
  sourceName?: string;
  url?: string;
  content?: string;
  ua?: string;
  proxy?: string;
  mergeSources?: MergeSources;
  ignoreFailedRemoteFile?: IgnoreFailedRemoteFileMode;
  includeUnsupportedProxy?: boolean;
  mode?: string;
  download?: boolean;
  noCache?: boolean;
  noFlow?: boolean;
  subInfoUrl?: string;
  subInfoUserAgent?: string;
};
export type FileSummary = Omit<SubStoreFile, "content">;
export type FileUpdate = Partial<Omit<SubStoreFile, "process">> & { process?: ProcessItem[] };
export type FileRenderQuery = {
  url?: string;
  subInfoUrl?: string;
  subInfoUserAgent?: string;
  ua?: string;
  content?: string;
  mergeSources?: MergeSources;
  ignoreFailedRemoteFile?: Exclude<IgnoreFailedRemoteFileMode, false>;
  includeUnsupportedProxy?: true;
  type?: string;
  source?: "local" | "remote";
  sourceType?: FileSourceType;
  sourceName?: string;
  mode?: string;
  proxy?: string;
  noCache?: true;
  noFlow?: true;
  produceType?: ProduceType;
  download?: true;
  fakeFile?: true;
  $options?: RuntimeOptions;
};
export const createFilesApi = (instance: AxiosInstance) => {
  return {
    list: () => instance.get<ApiSuccess<FileSummary[]>>("/api/files"),
    listWithContent: () => instance.get<ApiSuccess<SubStoreFile[]>>("/api/wholeFiles"),
    create: (file: SubStoreFile) => {
      return instance.post<ApiSuccess<SubStoreFile>>("/api/files", file);
    },
    replaceAll: (files: SubStoreFile[]) => {
      return instance.put<ApiSuccess>("/api/files", files);
    },
    get: (name: string) => {
      const path = `/api/wholeFile/${encodeURIComponent(name)}`;
      return instance.get<ApiSuccess<SubStoreFile>>(path);
    },
    downloadConfig: (name: string) => {
      const path = `/api/wholeFile/${encodeURIComponent(name)}`;
      return instance.get<SubStoreFile>(path, { params: { raw: 1 } });
    },
    renderContent: (name: string, query?: FileRenderQuery) => {
      const path = `/api/file/${encodeURIComponent(name)}`;
      return instance.get<string>(path, { params: query });
    },
    update: (name: string, file: FileUpdate) => {
      const path = `/api/file/${encodeURIComponent(name)}`;
      return instance.patch<ApiSuccess<SubStoreFile>>(path, file);
    },
    delete: (name: string, options?: DeleteOptions) => {
      const path = `/api/file/${encodeURIComponent(name)}`;
      return instance.delete<ApiSuccess>(path, { params: options });
    }
  };
};
