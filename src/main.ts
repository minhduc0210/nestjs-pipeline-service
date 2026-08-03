import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigService } from './core/config/app-config.service';
import { setupSwagger } from './core/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(AppConfigService);

  setupSwagger(app, { systemCode: config.systemCode });

  await app.listen(config.port);
}
bootstrap();
