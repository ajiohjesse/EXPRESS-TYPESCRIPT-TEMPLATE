import { APP_CONFIG } from "@/constants/app-config";
import { END_PONITS } from "@/constants/endpoints";
import {
  OpenApiGeneratorV3,
  OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";

export function generateOpenApiDocument(registries: OpenAPIRegistry[]) {
  const mainRegistry = new OpenAPIRegistry(registries);

  mainRegistry.registerComponent("securitySchemes", "bearerAuth", {
    type: "http",
    scheme: "bearer",
    bearerFormat: "JWT",
  });

  mainRegistry.registerComponent("securitySchemes", "cookieAuth", {
    type: "apiKey",
    in: "cookie",
    name: APP_CONFIG.refreshCookieName,
  });

  const generator = new OpenApiGeneratorV3(mainRegistry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: APP_CONFIG.version,
      title: APP_CONFIG.name,
      description: APP_CONFIG.description,
    },
    externalDocs: {
      description: "View the raw OpenAPI spec in JSON format",
      url: END_PONITS.DOCS.JSON,
    },
  });
}
