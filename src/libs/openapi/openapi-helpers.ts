import { type ResponseConfig } from "@asteasolutions/zod-to-openapi";
import { StatusCodes } from "http-status-codes";
import { z } from "./zod-extend";

// based off of the the standard api response object
type OpenAPIResponseType = {
  schema: z.ZodType;
  description: string;
  statusCode: StatusCodes;
  success: boolean;
};

// the responses are documented for every endpoint
const genericApiResponses: Record<number, ResponseConfig> = {
  [StatusCodes.TOO_MANY_REQUESTS]: {
    description: "Too many requests, please try again later",
    content: {
      "application/json": {
        schema: z.object({
          statusCode: z
            .number()
            .openapi({ example: StatusCodes.TOO_MANY_REQUESTS }),
          success: z.boolean().openapi({ example: false }),
          message: z
            .string()
            .openapi({ example: "Too many requests, please try again later" }),
          data: z.null().openapi({ example: null, type: "null" }),
        }),
      },
    },
  },
  [StatusCodes.INTERNAL_SERVER_ERROR]: {
    description: "Internal server error",
    content: {
      "application/json": {
        schema: z.object({
          statusCode: z
            .number()
            .openapi({ example: StatusCodes.INTERNAL_SERVER_ERROR }),
          success: z.boolean().openapi({ example: false }),
          message: z.string().openapi({ example: "Unable to process request" }),
          data: z.null().openapi({ example: null, type: "null" }),
        }),
      },
    },
  },
};

// generate the responses to include in the openapi registry
export function generateOpenApiResponses(configs: OpenAPIResponseType[]) {
  const responses: { [key: string]: ResponseConfig } = {
    ...genericApiResponses,
  };

  configs.forEach(({ schema, description, statusCode, success }) => {
    responses[statusCode] = {
      description,
      content: {
        "application/json": {
          schema: z.object({
            statusCode: z.number().openapi({ example: statusCode }),
            success: z.boolean().openapi({ example: success }),
            message: z.string().openapi({ example: description }),
            data: schema,
          }),
        },
      },
    };
  });
  return responses;
}

export const openApiNotFoundResponse: OpenAPIResponseType = {
  schema: z.null(),
  description: "Resource not found",
  statusCode: StatusCodes.NOT_FOUND,
  success: false,
};

export const openApiUnauthenticatedResponse: OpenAPIResponseType = {
  schema: z.null(),
  description: "Unauthenticated Request",
  statusCode: StatusCodes.UNAUTHORIZED,
  success: false,
};

export const openApiForbiddenResponse: OpenAPIResponseType = {
  schema: z.null(),
  description: "You are not authorized to access this resource",
  statusCode: StatusCodes.FORBIDDEN,
  success: false,
};

// helper for documenting paginated responses in openapi registries
export const getPaginatedResponseSchema = <T extends z.ZodType = z.ZodNull>(
  dataSchema: T
) =>
  z.object({
    items: z.array(dataSchema),
    meta: z.object({
      page: z.number().openapi({ example: 1, description: "The current page" }),
      limit: z
        .number()
        .openapi({ example: 10, description: "The number of items per page" }),
      totalItems: z
        .number()
        .openapi({ example: 100, description: "The total number of items" }),
    }),
  });
