import type { AxiosInstance } from "axios";
import type { ApiSuccess, ProduceType, ProxyTarget, RuleTarget } from "../types";

export type DownloadArguments = [
  rawUrl?: string,
  ua?: string,
  timeout?: number,
  customProxy?: string,
  skipCustomCache?: boolean,
  awaitCustomCache?: boolean,
  noCache?: boolean,
  preprocess?: boolean,
  options?: Record<string, unknown>
];
type ProxyParseSource =
  | { data: string; content?: never; download?: never }
  | { content: string; data?: never; download?: never }
  | { download: DownloadArguments; data?: never; content?: never };
type TargetSelection<T> = { client: T; platform?: never } | { client?: never; platform: T };
export type ProxyParseRequest = ProxyParseSource &
  TargetSelection<ProxyTarget> & {
    type?: Exclude<ProduceType, "raw">;
    produce?: Record<string, unknown>;
  };
type RuleParseSource = { data: string; content?: never } | { content: string; data?: never };
export type RuleParseRequest = RuleParseSource & TargetSelection<RuleTarget>;
export type ParseResult<T = string | unknown> = { par_res: T };
export const createParserApi = (instance: AxiosInstance) => {
  return {
    parseProxies: <T = string | unknown>(request: ProxyParseRequest) => {
      return instance.post<ApiSuccess<ParseResult<T>>>("/api/proxy/parse", request);
    },
    parseRules: (request: RuleParseRequest) => {
      return instance.post<ApiSuccess<ParseResult<string>>>("/api/rule/parse", request);
    }
  };
};
