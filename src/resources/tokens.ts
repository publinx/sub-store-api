import type { AxiosInstance } from "axios";
import type { AgePublicKeyConfig, ApiSuccess, DeleteMode } from "../types";

export type ShareType = "sub" | "col" | "file";
export type DurationUnit = "day" | "month" | "season" | "year";
export type ShareTokenPayload = AgePublicKeyConfig & {
  type: ShareType;
  name: string;
  token?: string;
  [key: string]: unknown;
};
type DurationDisplay =
  | { expiresValue?: never; expiresUnit?: never }
  | { expiresValue: number | string; expiresUnit: DurationUnit };
export type DurationTokenOptions = DurationDisplay & {
  mode: "duration";
  expiresIn: string | number;
};
export type DatetimeTokenOptions = { mode: "datetime"; exp: number };
export type CountTokenOptions = { mode: "count"; count: number; usedCount?: number };
export type PermanentTokenOptions = { mode?: undefined; expiresIn?: undefined; exp?: undefined };
export type LegacyDurationTokenOptions = DurationDisplay & {
  mode?: undefined;
  expiresIn: string | number;
};
export type LegacyDatetimeTokenOptions = { mode?: undefined; expiresIn?: undefined; exp: number };
export type ShareTokenOptions =
  | DurationTokenOptions
  | DatetimeTokenOptions
  | CountTokenOptions
  | PermanentTokenOptions
  | LegacyDurationTokenOptions
  | LegacyDatetimeTokenOptions;
export type ShareToken = ShareTokenPayload & {
  token: string;
  createdAt: number;
  mode?: "duration" | "datetime" | "count";
  exp?: number;
  expiresIn?: string | number;
  expiresValue?: string;
  expiresUnit?: DurationUnit;
  count?: number;
  usedCount?: number;
};
export type CreateShareTokenRequest = { payload: ShareTokenPayload; options?: ShareTokenOptions };
export type TokenQuery = { type?: ShareType; name?: string };
export type DeleteShareTokenRequest = {
  token: string;
  type: ShareType;
  name: string;
  mode?: DeleteMode;
};
export const createTokensApi = (instance: AxiosInstance) => {
  return {
    list: (query?: TokenQuery) => {
      return instance.get<ApiSuccess<ShareToken[]>>("/api/tokens", { params: query });
    },
    create: (request: CreateShareTokenRequest) => {
      return instance.post<ApiSuccess<{ token: string }>>("/api/token", request);
    },
    delete: ({ token, ...query }: DeleteShareTokenRequest) => {
      const path = `/api/token/${encodeURIComponent(token)}`;
      return instance.delete<ApiSuccess>(path, { params: query });
    }
  };
};
