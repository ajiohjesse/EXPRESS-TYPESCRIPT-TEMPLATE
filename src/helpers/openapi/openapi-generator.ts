import { appConfig } from '@/app/config';
import { END_PONITS } from '@/app/endpoints';
import {
  extendZodWithOpenApi,
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

//adds the openapi methods to zod schemas
extendZodWithOpenApi(z);

export function generateOpenApiDocument(registries: OpenAPIRegistry[]) {
  const mainRegistry = new OpenAPIRegistry(registries);

  mainRegistry.registerComponent('securitySchemes', 'bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  });

  mainRegistry.registerComponent('securitySchemes', 'cookieAuth', {
    type: 'apiKey',
    in: 'cookie',
    name: appConfig.refreshCookieName,
  });

  const generator = new OpenApiGeneratorV3(mainRegistry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: appConfig.version,
      title: appConfig.name,
      description: appConfig.description,
    },
    externalDocs: {
      description: 'View the raw OpenAPI spec in JSON format',
      url: END_PONITS.DOCS.JSON,
    },
  });
}
