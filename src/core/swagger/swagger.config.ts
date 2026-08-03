import type { SwaggerCustomOptions } from '@nestjs/swagger';

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
}

/**
 * Technologia Theme: Sleek, modern, high-tech enterprise UI for Swagger UI.
 * Features dark space background, cyan/indigo neon accents, glassmorphic cards, crisp typography, and tech badge styling.
 */
export const SWAGGER_CUSTOM_CSS = `
  /* Global Background & Typography */
  body {
    background-color: #0b0f19 !important;
    color: #f8fafc !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
  }

  /* Sleek Tech Topbar */
  .swagger-ui .topbar {
    background: #0f172a !important;
    padding: 12px 0 !important;
    border-bottom: 1px solid rgba(14, 165, 233, 0.3) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
  }
  .swagger-ui .topbar a {
    max-width: none !important;
  }
  .swagger-ui .topbar-wrapper img {
    content: url('https://nestjs.com/img/logo-small.svg') !important;
    height: 36px !important;
    width: auto !important;
  }
  .swagger-ui .topbar-wrapper::after {
    content: '⚡ TECHNOLOGIA API STUDIO';
    color: #38bdf8 !important;
    font-weight: 700 !important;
    font-size: 1.1rem !important;
    margin-left: 12px !important;
    letter-spacing: 1px !important;
  }

  /* Main Container & Info Card */
  .swagger-ui .info {
    background: #1e293b !important;
    border: 1px solid rgba(14, 165, 233, 0.2) !important;
    border-radius: 12px !important;
    padding: 24px !important;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important;
    margin: 30px 0 !important;
  }
  .swagger-ui .info .title {
    color: #38bdf8 !important;
    font-weight: 800 !important;
    font-size: 2rem !important;
    letter-spacing: -0.5px !important;
  }
  .swagger-ui .info p,
  .swagger-ui .info li,
  .swagger-ui .info td {
    color: #94a3b8 !important;
  }

  /* Scheme & Authorize Bar */
  .swagger-ui .scheme-container {
    background: #1e293b !important;
    border: 1px solid rgba(14, 165, 233, 0.15) !important;
    border-radius: 10px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
    padding: 14px 20px !important;
    margin-bottom: 24px !important;
  }
  .swagger-ui .auth-wrapper .btn.authorize {
    background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%) !important;
    color: #ffffff !important;
    border: 1px solid rgba(56, 189, 248, 0.4) !important;
    border-radius: 8px !important;
    font-weight: 700 !important;
    padding: 8px 20px !important;
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3) !important;
    transition: all 0.2s ease !important;
  }
  .swagger-ui .auth-wrapper .btn.authorize:hover {
    box-shadow: 0 6px 18px rgba(56, 189, 248, 0.5) !important;
    transform: translateY(-1px) !important;
  }
  .swagger-ui .auth-wrapper .btn.authorize svg {
    fill: #ffffff !important;
  }

  /* Endpoint Filter & Search Bar */
  .swagger-ui .filter .operation-filter-input {
    background-color: #0f172a !important;
    border: 1px solid #334155 !important;
    color: #f8fafc !important;
    border-radius: 8px !important;
    padding: 10px 14px !important;
  }

  /* Endpoint Blocks - Glassmorphic Dark Cards */
  .swagger-ui .opblock {
    background: #1e293b !important;
    border-radius: 12px !important;
    border: 1px solid #334155 !important;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
    margin-bottom: 16px !important;
    overflow: hidden !important;
    transition: border-color 0.2s ease, box-shadow 0.2s ease !important;
  }
  .swagger-ui .opblock:hover {
    border-color: #38bdf8 !important;
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.15) !important;
  }

  /* Operation Summary Text & Path */
  .swagger-ui .opblock .opblock-summary-path {
    color: #f8fafc !important;
    font-weight: 700 !important;
    font-family: 'Fira Code', 'JetBrains Mono', Consolas, monospace !important;
    font-size: 1rem !important;
  }
  .swagger-ui .opblock .opblock-summary-description {
    color: #94a3b8 !important;
    font-weight: 500 !important;
  }
  .swagger-ui .opblock-summary-operation-id {
    color: #38bdf8 !important;
    font-family: monospace !important;
    font-size: 0.85rem !important;
  }

  /* HTTP Method Badges (High-Tech Neon Pills) */
  .swagger-ui .opblock.opblock-get { border-color: rgba(16, 185, 129, 0.4) !important; }
  .swagger-ui .opblock.opblock-get .opblock-summary-method {
    background: #10b981 !important;
    color: #022c22 !important;
    border-radius: 6px !important;
    font-weight: 800 !important;
    padding: 6px 14px !important;
  }

  .swagger-ui .opblock.opblock-post { border-color: rgba(99, 102, 241, 0.4) !important; }
  .swagger-ui .opblock.opblock-post .opblock-summary-method {
    background: #6366f1 !important;
    color: #ffffff !important;
    border-radius: 6px !important;
    font-weight: 800 !important;
    padding: 6px 14px !important;
  }

  .swagger-ui .opblock.opblock-put { border-color: rgba(245, 158, 11, 0.4) !important; }
  .swagger-ui .opblock.opblock-put .opblock-summary-method {
    background: #f59e0b !important;
    color: #451a03 !important;
    border-radius: 6px !important;
    font-weight: 800 !important;
    padding: 6px 14px !important;
  }

  .swagger-ui .opblock.opblock-delete { border-color: rgba(239, 68, 68, 0.4) !important; }
  .swagger-ui .opblock.opblock-delete .opblock-summary-method {
    background: #ef4444 !important;
    color: #4c0519 !important;
    border-radius: 6px !important;
    font-weight: 800 !important;
    padding: 6px 14px !important;
  }

  /* Opblock Inner Content Body & Tables */
  .swagger-ui .opblock-body {
    background: #0f172a !important;
    color: #f8fafc !important;
    padding: 20px !important;
  }
  .swagger-ui .opblock-body pre,
  .swagger-ui .opblock-body td,
  .swagger-ui .opblock-body th,
  .swagger-ui .opblock-body p,
  .swagger-ui .opblock-body span,
  .swagger-ui .opblock-body div,
  .swagger-ui .opblock-body .opblock-title,
  .swagger-ui .responses-header,
  .swagger-ui .response-col_status,
  .swagger-ui .response-col_description {
    color: #f8fafc !important;
  }

  /* Section Header Bars */
  .swagger-ui .opblock-section-header {
    background: #1e293b !important;
    border: 1px solid #334155 !important;
    border-radius: 8px !important;
    padding: 10px 16px !important;
  }
  .swagger-ui .opblock-section-header h4,
  .swagger-ui .opblock-section-header span {
    color: #38bdf8 !important;
    font-weight: 700 !important;
  }

  /* Table Styling */
  .swagger-ui table thead tr th,
  .swagger-ui table thead tr td {
    color: #cbd5e1 !important;
    border-bottom: 1px solid #334155 !important;
    font-weight: 700 !important;
  }
  .swagger-ui table tbody tr td {
    color: #e2e8f0 !important;
  }
  .swagger-ui .parameter__name {
    color: #38bdf8 !important;
    font-weight: 700 !important;
  }
  .swagger-ui .parameter__type {
    color: #a855f7 !important;
    font-weight: 600 !important;
  }

  /* Tech Action Buttons */
  .swagger-ui .btn {
    border-radius: 8px !important;
    border: 1px solid #334155 !important;
    font-weight: 600 !important;
    padding: 8px 18px !important;
  }
  .swagger-ui .btn.execute {
    background: linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%) !important;
    color: #ffffff !important;
    border: none !important;
    font-weight: 700 !important;
    box-shadow: 0 4px 14px rgba(14, 165, 233, 0.3) !important;
  }
  .swagger-ui .btn.try-out__btn {
    background: #334155 !important;
    color: #38bdf8 !important;
    border-color: #0ea5e9 !important;
  }

  /* Code Blocks & Inputs */
  .swagger-ui .highlight-code, .swagger-ui pre {
    background-color: #020617 !important;
    border: 1px solid #1e293b !important;
    border-radius: 8px !important;
  }
  .swagger-ui input[type=text], .swagger-ui select {
    background-color: #0f172a !important;
    color: #f8fafc !important;
    border: 1px solid #334155 !important;
    border-radius: 8px !important;
  }
`;

/**
 * Custom JavaScript script injected into Swagger UI page for Technologia interactive console logging.
 */
export const SWAGGER_CUSTOM_JS_STR = `
  console.log("%c ⚡ TECHNOLOGIA API STUDIO READY ", "background: #0ea5e9; color: #ffffff; font-size: 14px; font-weight: bold; border-radius: 4px; padding: 6px 12px;");
`;

/**
 * Returns default Swagger options configured with the Technologia theme.
 *
 * @param systemCode - Optional system identifier for titling
 */
export function getDefaultSwaggerOptions(
  systemCode = 'PIPELINE_SERVICE',
): ISwaggerOptions {
  return {
    path: 'api-docs',
    systemCode,
    title: `[${systemCode}] Technologia API Studio`,
    description:
      'High-tech OpenAPI specification & interactive developer portal',
    version: '1.0.0',
    customSiteTitle: `⚡ [${systemCode}] Technologia API Studio`,
    customfavIcon: 'https://nestjs.com/img/logo-small.svg',
    customCss: SWAGGER_CUSTOM_CSS,
    customJsStr: SWAGGER_CUSTOM_JS_STR,
    explorer: true,
    raw: true,
    jsonDocumentUrl: 'api-docs-json',
    yamlDocumentUrl: 'api-docs-yaml',
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
      syntaxHighlight: {
        theme: 'monokai',
      },
    },
  };
}
