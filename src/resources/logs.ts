import type { AxiosInstance } from "axios";
import type { ApiSuccess } from "../types";

export type LogLevel = "log" | "info" | "warn" | "error" | "debug";
export type LogEntry = { id: string; time: number; level: LogLevel; message: string };
export type LogsResult = { logs: LogEntry[]; total: number; maxCount: number };
export type LogsQuery = { limit?: number; keyword?: string; regex?: boolean; ignoreCase?: boolean };
export const createLogsApi = (instance: AxiosInstance) => {
  return {
    search: (query?: LogsQuery) => {
      return instance.get<ApiSuccess<LogsResult>>("/api/logs", { params: query });
    },
    clear: () => instance.delete<ApiSuccess>("/api/logs")
  };
};
