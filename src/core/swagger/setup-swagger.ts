import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  getDefaultSwaggerOptions,
  type ISwaggerOptions,
} from './swagger.config';

/**
 * Sets up OpenAPI (Swagger) documentation endpoint and UI for NestJS application.
 *
 * @param app - The initialized NestJS application instance
 * @param options - Configuration options for Swagger documentation and UI behavior
 */
export function setupSwagger(
  app: INestApplication,
  options?: ISwaggerOptions,
): void {
  const {
    path = 'api-docs',
    title = '[PIPELINE_SERVICE] Microservice API',
    description = 'Interactive OpenAPI specification & developer documentation',
    version = '1.0.0',
    documentOptions,
    ...swaggerUiOptions
  } = getDefaultSwaggerOptions(options);

  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .addApiKey(
      { type: 'apiKey', name: 'x-session-id', in: 'header' },
      'x-session-id',
    )
    .addApiKey(
      { type: 'apiKey', name: 'x-correlation-id', in: 'header' },
      'x-correlation-id',
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, documentOptions);

  SwaggerModule.setup(path, app, document, swaggerUiOptions);
}
