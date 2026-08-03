import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

import { setupSwagger } from '../setup-swagger';
import { getDefaultSwaggerOptions } from '../swagger.config';

jest.mock('@nestjs/swagger', () => {
  const original = jest.requireActual('@nestjs/swagger');
  return {
    ...original,
    SwaggerModule: {
      createDocument: jest.fn().mockReturnValue({ openapi: '3.0.0', info: { title: 'Mock' }, paths: {} }),
      setup: jest.fn(),
    },
  };
});

describe('setupSwagger & swagger.config', () => {
  let mockApp: jest.Mocked<INestApplication>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockApp = {} as unknown as jest.Mocked<INestApplication>;
  });

  describe('getDefaultSwaggerOptions', () => {
    it('should generate default options with default system code', () => {
      const options = getDefaultSwaggerOptions();
      expect(options.systemCode).toBe('PIPELINE_SERVICE');
      expect(options.title).toBe('[PIPELINE_SERVICE] Technologia API Studio');
      expect(options.customSiteTitle).toBe('⚡ [PIPELINE_SERVICE] Technologia API Studio');
      expect(options.explorer).toBe(true);
      expect(options.raw).toBe(true);
      expect(options.customCss).toBeDefined();
      expect(options.customJsStr).toBeDefined();
    });

    it('should generate default options with custom system code', () => {
      const options = getDefaultSwaggerOptions('BOOKING_SVC');
      expect(options.systemCode).toBe('BOOKING_SVC');
      expect(options.title).toBe('[BOOKING_SVC] Technologia API Studio');
      expect(options.customSiteTitle).toBe('⚡ [BOOKING_SVC] Technologia API Studio');
    });
  });

  describe('setupSwagger', () => {
    it('should setup Swagger with default configuration options', () => {
      setupSwagger(mockApp);

      expect(SwaggerModule.createDocument).toHaveBeenCalledWith(
        mockApp,
        expect.objectContaining({
          info: expect.objectContaining({
            title: '[PIPELINE_SERVICE] Technologia API Studio',
            version: '1.0.0',
          }),
        }),
      );

      expect(SwaggerModule.setup).toHaveBeenCalledWith(
        'api-docs',
        mockApp,
        expect.anything(),
        expect.objectContaining({
          customSiteTitle: '⚡ [PIPELINE_SERVICE] Technologia API Studio',
          explorer: true,
          raw: true,
          swaggerOptions: expect.objectContaining({
            persistAuthorization: true,
            displayRequestDuration: true,
            tryItOutEnabled: true,
          }),
        }),
      );
    });

    it('should setup Swagger with custom configuration options and SwaggerCustomOptions', () => {
      setupSwagger(mockApp, {
        path: 'custom-docs',
        systemCode: 'CUSTOM_SYS',
        title: 'Custom API Title',
        description: 'Custom Description',
        version: '2.0',
        customSiteTitle: 'Custom Page Title',
        customCss: '.swagger-ui { background-color: #000; }',
        explorer: false,
        swaggerOptions: {
          docExpansion: 'none',
        },
      });

      expect(SwaggerModule.createDocument).toHaveBeenCalledWith(
        mockApp,
        expect.objectContaining({
          info: expect.objectContaining({
            title: 'Custom API Title',
            description: 'Custom Description',
            version: '2.0',
          }),
        }),
      );

      expect(SwaggerModule.setup).toHaveBeenCalledWith(
        'custom-docs',
        mockApp,
        expect.anything(),
        expect.objectContaining({
          customSiteTitle: 'Custom Page Title',
          customCss: '.swagger-ui { background-color: #000; }',
          explorer: false,
          swaggerOptions: expect.objectContaining({
            docExpansion: 'none',
            persistAuthorization: true,
            displayRequestDuration: true,
          }),
        }),
      );
    });
  });
});
