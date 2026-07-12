import type { AxiosInstance } from "axios";
import type { ApiSuccess } from "../types";
import type { ArchiveEntry } from "./archives";
import type { Artifact } from "./artifacts";
import type { Collection } from "./collections";
import type { FileSummary } from "./files";
import type { Subscription } from "./subscriptions";
import type { ShareToken } from "./tokens";

const createSort =
  <T>(instance: AxiosInstance, path: string) =>
  (order: string[]) => {
    return instance.post<ApiSuccess<T[]>>(path, order);
  };
export const createSortApi = (instance: AxiosInstance) => {
  return {
    subscriptions: createSort<Subscription>(instance, "/api/sort/subs"),
    collections: createSort<Collection>(instance, "/api/sort/collections"),
    artifacts: createSort<Artifact>(instance, "/api/sort/artifacts"),
    files: createSort<FileSummary>(instance, "/api/sort/files"),
    tokens: createSort<ShareToken>(instance, "/api/sort/tokens"),
    archives: createSort<ArchiveEntry>(instance, "/api/sort/archives")
  };
};
