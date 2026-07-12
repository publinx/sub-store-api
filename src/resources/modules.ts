import type { AxiosInstance } from "axios";
import type { ApiSuccess } from "../types";

export type SubStoreModule = {
  name: string;
  content: string;
  displayName?: string;
  [key: string]: unknown;
};
export type ModuleCreate = Omit<SubStoreModule, "name"> & { name?: string };
export type ModuleSummary = Omit<SubStoreModule, "content">;
export type ModuleUpdate = Partial<SubStoreModule>;
export const createModulesApi = (instance: AxiosInstance) => {
  return {
    list: () => instance.get<ApiSuccess<ModuleSummary[]>>("/api/modules"),
    create: (module: ModuleCreate) => {
      return instance.post<ApiSuccess<SubStoreModule>>("/api/modules", module);
    },
    replaceAll: (modules: SubStoreModule[]) => {
      return instance.put<ApiSuccess>("/api/modules", modules);
    },
    getContent: (name: string) => {
      const path = `/api/module/${encodeURIComponent(name)}`;
      return instance.get<string>(path);
    },
    update: (name: string, module: ModuleUpdate) => {
      const path = `/api/module/${encodeURIComponent(name)}`;
      return instance.patch<ApiSuccess<SubStoreModule>>(path, module);
    },
    delete: (name: string) => {
      const path = `/api/module/${encodeURIComponent(name)}`;
      return instance.delete<ApiSuccess>(path);
    }
  };
};
