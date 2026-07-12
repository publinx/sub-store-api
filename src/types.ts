export type JsonObject = Record<string, unknown>;

export type ApiErrorType =
  "RequestInvalidError" | "ResourceNotFoundError" | "NetworkError" | "InternalServerError";

export type ApiError = {
  code?: string;
  type?: ApiErrorType;
  message: string;
  details?: string;
};

export type ApiSuccess<T = undefined> = [T] extends [undefined]
  ? { status: "success"; data?: undefined }
  : { status: "success"; data: T };

export type ApiFailure = {
  status: "failed";
  error: ApiError;
};

export type DeleteMode = "archive" | "permanent";
export type DeleteOptions = { mode?: DeleteMode };
export type EditorLanguage = "javascript" | "json" | "json5" | "yaml" | "ini" | "plaintext";
export type MergeSources = "localFirst" | "remoteFirst";
export type IgnoreFailedRemoteSubMode =
  boolean | "disabled" | "quiet" | "enabled" | "fallbackNotify" | "fallbackQuiet";
export type IgnoreFailedRemoteFileMode = boolean | "enabled";
export type AgeKeyType = "x25519" | "mlkem768-x25519";
export type AgePublicKeyConfig = { "age-public-key"?: string };

export type ProxyTarget =
  | "qx"
  | "QX"
  | "QuantumultX"
  | "surge"
  | "Surge"
  | "SurgeMac"
  | "Loon"
  | "Clash"
  | "meta"
  | "clashmeta"
  | "clash.meta"
  | "Clash.Meta"
  | "ClashMeta"
  | "mihomo"
  | "Mihomo"
  | "uri"
  | "URI"
  | "v2"
  | "v2ray"
  | "V2Ray"
  | "json"
  | "JSON"
  | "stash"
  | "Stash"
  | "shadowrocket"
  | "Shadowrocket"
  | "ShadowRocket"
  | "surfboard"
  | "Surfboard"
  | "singbox"
  | "sing-box"
  | "egern"
  | "Egern";

export type RuleTarget = "QX" | "Surge" | "Loon" | "Clash";
export type ProduceType = "internal" | "raw";

type ProcessItemBase = {
  disabled?: boolean;
  customName?: string;
};

export type ConditionalRule =
  | { attr: string; proposition: "IN" | "CONTAINS" | "EQUALS" | "EXISTS"; value?: unknown }
  | { operator: "AND" | "OR"; child: ConditionalRule[] }
  | { operator: "NOT"; child: ConditionalRule };

export type ScriptProcessArgs = {
  mode?: "link" | "script";
  content: string;
  arguments?: JsonObject;
  editorLanguage?: EditorLanguage;
  previewLanguage?: EditorLanguage;
  [key: string]: unknown;
};

export type ProcessItem = ProcessItemBase &
  (
    | { type: "Useless Filter"; args?: never }
    | {
        type: "Region Filter";
        args: string[] | { value: string[]; keep?: boolean };
      }
    | { type: "Regex Filter"; args: { regex: string[]; keep?: boolean } }
    | { type: "Type Filter"; args: string[] | { value: string[]; keep?: boolean } }
    | {
        type: "Script Filter" | "Script Operator" | "Response Transformer";
        args: ScriptProcessArgs;
      }
    | { type: "Conditional Filter"; args: { rule: ConditionalRule } }
    | {
        type: "Quick Setting Operator";
        args: {
          useless?: "ENABLED" | "DISABLED";
          udp?: "ENABLED" | "DISABLED";
          tfo?: "ENABLED" | "DISABLED";
          scert?: "ENABLED" | "DISABLED";
          "vmess aead"?: "ENABLED" | "DISABLED";
          reuse?: "ENABLED" | "DISABLED";
          ecn?: "ENABLED" | "DISABLED";
          "block-quic"?: "auto" | "on" | "off";
          "ip-version"?: string;
        };
      }
    | { type: "Flag Operator"; args: { mode?: "add" | "remove"; tw?: "ws" | "tw" | "cn" } }
    | { type: "Sort Operator"; args?: "asc" | "desc" | "random" }
    | {
        type: "Regex Sort Operator";
        args: string[] | { expressions: string[]; order?: "asc" | "desc" | "original" };
      }
    | { type: "Regex Rename Operator"; args: Array<{ expr: string; now: string }> }
    | { type: "Regex Delete Operator"; args: string[] }
    | {
        type: "Add Proxies From Subscription Operator";
        args: {
          sourceType?: "subscription" | "sub" | "collection" | "col" | "file";
          sourceName: string;
          includeUnsupportedProxy?: boolean;
          position?: "front" | "back" | "replace";
        };
      }
    | {
        type: "Handle Duplicate Operator";
        args?: {
          action?: "rename" | "delete";
          template?: string;
          link?: string;
          position?: "front" | "back";
          field?: string[];
        };
      }
    | {
        type: "Resolve Domain Operator";
        args: {
          provider: "Custom" | "Google" | "IP-API" | "Cloudflare" | "Ali" | "Tencent";
          type?: "IPv4" | "IPv6" | "IP4P";
          filter?: string;
          cache?: boolean;
          url?: string;
          tlsSkipCertVerify?: boolean | "enabled";
          timeout?: number;
          cacheTtl?: number;
          edns?: string;
          concurrency?: number;
          dnsConcurrency?: number;
        };
      }
  );

export type ResourceBase = {
  name: string;
  displayName?: string;
  remark?: string;
  tag?: string[];
  process?: ProcessItem[];
  editorLanguage?: EditorLanguage;
  previewLanguage?: EditorLanguage;
  [key: string]: unknown;
} & AgePublicKeyConfig;

export type RuntimeOptions = string;

export type FlowInfo = {
  expires?: number;
  total: number;
  usage: { upload: number; download: number };
  remainingDays?: number;
  appUrl?: string;
  planName?: string;
};

export type ProxyNode = {
  name: string;
  type: string;
  server: string;
  port: number;
  [key: string]: unknown;
};
