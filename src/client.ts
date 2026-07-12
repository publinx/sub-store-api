import { type HttpOptions, createHttp } from "./http";
import { createArchivesApi } from "./resources/archives";
import { createArtifactsApi } from "./resources/artifacts";
import { createCollectionsApi } from "./resources/collections";
import { createDownloadsApi } from "./resources/downloads";
import { createFilesApi } from "./resources/files";
import { createLogsApi } from "./resources/logs";
import { createModulesApi } from "./resources/modules";
import { createParserApi } from "./resources/parser";
import { createPreviewApi } from "./resources/preview";
import { createSettingsApi } from "./resources/settings";
import { createSortApi } from "./resources/sort";
import { createStorageApi } from "./resources/storage";
import { createSubscriptionsApi } from "./resources/subscriptions";
import { createTokensApi } from "./resources/tokens";
import { createUtilitiesApi } from "./resources/utilities";

export const createApiClient = (options?: HttpOptions) => {
  const http = createHttp(options);
  return {
    archives: createArchivesApi(http),
    artifacts: createArtifactsApi(http),
    collections: createCollectionsApi(http),
    downloads: createDownloadsApi(http),
    files: createFilesApi(http),
    logs: createLogsApi(http),
    modules: createModulesApi(http),
    parser: createParserApi(http),
    preview: createPreviewApi(http),
    settings: createSettingsApi(http),
    sort: createSortApi(http),
    storage: createStorageApi(http),
    subscriptions: createSubscriptionsApi(http),
    tokens: createTokensApi(http),
    utilities: createUtilitiesApi(http)
  };
};
