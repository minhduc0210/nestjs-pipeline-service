import type {
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

/**
 * Interface defining options for configuring Swagger / OpenAPI documentation.
 * Extends NestJS `SwaggerCustomOptions` to support UI styling, custom titles, CSS, JS, etc.
 */
export interface ISwaggerOptions extends SwaggerCustomOptions {
  /** Swagger UI mounting path (default: 'api-docs') */
  path?: string;
  /** Custom API Title for OpenAPI document (default: '[SYSTEM_CODE] Microservice API') */
  title?: string;
  /** API Description */
  description?: string;
  /** API Version (default: '1.0') */
  version?: string;
  /** System code retrieved from AppConfigService */
  systemCode?: string;
  /** Custom OpenAPI document options (e.g. operationIdFactory, extraModels, deepScanRoutes) */
  documentOptions?: SwaggerDocumentOptions;
}

/**
 * Minimal custom CSS styling injected into Swagger UI.
 * Applies subtle topbar logo adjustments while preserving standard Swagger UI default colors.
 */
export const SWAGGER_CUSTOM_CSS = `
  /* Topbar Logo & Title Tweaks */
  .swagger-ui .topbar a {
    max-width: none;
  }
  .swagger-ui .topbar-wrapper img {
    content: url('https://i.pinimg.com/736x/ae/e3/4d/aee34ddfd65c21d2696329a3a686a94c.jpg');
    height: 34px;
    width: auto;
  }
  .swagger-ui .topbar-wrapper::after {
    content: '⚡ API Explorer';
    color: #ffffff;
    font-weight: 700;
    font-size: 1.05rem;
    margin-left: 10px;
  }
`;

/**
 * Custom JavaScript script injected into Swagger UI page for interactive console logging.
 */
export const SWAGGER_CUSTOM_JS_STR = `
  console.log("%c ⚡ API Explorer Ready ", "background: #0ea5e9; color: #ffffff; font-size: 14px; font-weight: bold; border-radius: 4px; padding: 6px 12px;");
`;

/**
 * Returns default Swagger options using standard Swagger UI default styling with minimal topbar tweaks.
 *
 * @param options - Optional custom configuration options or systemCode override
 */
export function getDefaultSwaggerOptions(
  options?: ISwaggerOptions,
): ISwaggerOptions {
  const systemCode = options?.systemCode ?? 'PIPELINE_SERVICE';
  const defaults: ISwaggerOptions = {
    path: 'api-docs',
    systemCode,
    title: `[${systemCode}] Microservice API`,
    description: 'Interactive OpenAPI specification & developer documentation',
    version: '1.0.0',
    customSiteTitle: `[${systemCode}] API Documentation`,
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: SWAGGER_CUSTOM_CSS,
    customJsStr: SWAGGER_CUSTOM_JS_STR,
    explorer: true,
    raw: true,
    jsonDocumentUrl: 'api-docs-json',
    yamlDocumentUrl: 'api-docs-yaml',
    documentOptions: {
      operationIdFactory: (_controllerKey: string, methodKey: string) =>
        methodKey,
    },
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'list',
      filter: true,
      tryItOutEnabled: true,
      displayOperationId: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 3,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  };

  return {
    ...defaults,
    ...options,
    documentOptions: {
      ...defaults.documentOptions,
      ...options?.documentOptions,
    },
    swaggerOptions: {
      ...defaults.swaggerOptions,
      ...options?.swaggerOptions,
    },
  };
}
