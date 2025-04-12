import type { Request } from "express";
import type { z } from "zod";
import { PublicError } from "./error";

interface FieldError {
  path: string[];
  message: string;
}

class ValidationErrorData {
  field: string;
  errors: FieldError[];

  constructor(field: string, zodError: z.ZodError) {
    this.field = field;
    this.errors = zodError.errors.map(err => ({
      path: err.path.map(String),
      message: err.message,
    }));
  }
}

export type RequestValidatorOptions<
  TBody extends z.ZodObject<z.ZodRawShape> = never,
  TQuery extends z.ZodObject<z.ZodRawShape> = never,
  TParams extends z.ZodObject<z.ZodRawShape> = never,
> = {
  body?: TBody;
  query?: TQuery;
  params?: TParams;
} & ({ body: TBody } | { query: TQuery } | { params: TParams });

/**
 * Class for validating Express request objects (body, query, and path parameters) using Zod schemas.
 * Throws a `PublicError` when validation fails.
 */
export class RequestValidator {
  /**
   * Validates request body, query, and path parameters simultaneously.
   * @param request - Express request object.
   * @param options - Object containing Zod schemas for validation.
   * @returns Validated data for body, query, and params.
   * @throws {PublicError} If validation fails for any field.
   */
  validate<
    TBody extends z.ZodObject<z.ZodRawShape>,
    TQuery extends z.ZodObject<z.ZodRawShape>,
    TParams extends z.ZodObject<z.ZodRawShape>,
  >(
    request: Request,
    options: RequestValidatorOptions<TBody, TQuery, TParams>
  ): {
    body: z.infer<TBody>;
    query: z.infer<TQuery>;
    params: z.infer<TParams>;
  } {
    const errors: ValidationErrorData[] = [];
    let validatedBody: z.infer<TBody> = {};
    let validatedQuery: z.infer<TQuery> = {};
    let validatedParams: z.infer<TParams> = {};

    if (options.body) {
      const parsedBody = options.body.safeParse(request.body);
      if (parsedBody.success) {
        validatedBody = request.body = parsedBody.data;
      } else {
        errors.push(new ValidationErrorData("body", parsedBody.error));
      }
    }

    if (options.query) {
      const parsedQuery = options.query.safeParse(request.query);
      if (parsedQuery.success) {
        validatedQuery = request.query = parsedQuery.data;
      } else {
        errors.push(new ValidationErrorData("query", parsedQuery.error));
      }
    }

    if (options.params) {
      const parsedParams = options.params.safeParse(request.params);
      if (parsedParams.success) {
        validatedParams = request.params = parsedParams.data;
      } else {
        errors.push(new ValidationErrorData("params", parsedParams.error));
      }
    }

    if (errors.length > 0) {
      throw new PublicError(400, "Request validation failed", { errors });
    }

    return {
      body: validatedBody,
      query: validatedQuery,
      params: validatedParams,
    };
  }

  /**
   * Validates request body against a Zod schema.
   * @param body - Request body object.
   * @param schema - Zod schema for validation.
   * @returns Parsed and validated body data.
   * @throws {PublicError} If validation fails.
   */
  validateBody<T extends z.ZodObject<z.ZodRawShape>>(
    body: Request["body"],
    schema: T
  ): z.infer<T> {
    const parsedBody = schema.safeParse(body);
    if (!parsedBody.success) {
      throw new PublicError(400, "Invalid request body", {
        errors: [new ValidationErrorData("body", parsedBody.error)],
      });
    }
    return parsedBody.data;
  }

  /**
   * Validates query parameters against a Zod schema.
   * If the schema has optional fields with defaults, they are returned instead of throwing an error.
   * @param query - Request query object.
   * @param schema - Zod schema for validation.
   * @returns Parsed query object or default values.
   * @throws {PublicError} If required fields fail validation.
   */
  validateQuery<T extends z.ZodObject<z.ZodRawShape>>(
    query: Request["query"],
    schema: T
  ): z.infer<T> {
    const parsedQuery = schema.safeParse(query);
    if (parsedQuery.success) {
      return parsedQuery.data;
    }

    const requiredErrors = parsedQuery.error.errors.filter(err => {
      return err.path.every(path => !schema.shape[path].isOptional());
    });

    if (requiredErrors.length > 0) {
      throw new PublicError(400, "Invalid request query parameters", {
        errors: [new ValidationErrorData("query", parsedQuery.error)],
      });
    }

    return this._getZodSchemaDefaultValues(schema);
  }

  /**
   * Validates path parameters against a Zod schema.
   * @param params - Request path parameters.
   * @param schema - Zod schema for validation.
   * @returns Parsed and validated path parameters.
   * @throws {PublicError} If validation fails.
   */
  validateParams<T extends z.ZodObject<z.ZodRawShape>>(
    params: Request["params"],
    schema: T
  ): z.infer<T> {
    const parsedParams = schema.safeParse(params);
    if (!parsedParams.success) {
      throw new PublicError(400, "Invalid request path parameters", {
        errors: [new ValidationErrorData("params", parsedParams.error)],
      });
    }
    return parsedParams.data;
  }

  /**
   * Extracts default values from a Zod schema.
   * @param schema - Zod object schema.
   * @returns Object containing default values.
   */
  private _getZodSchemaDefaultValues<T extends z.ZodObject<z.ZodRawShape>>(
    schema: T
  ): Partial<z.infer<T>> {
    const shape = schema.shape;
    const defaults: Record<string, unknown> = {};

    for (const key in shape) {
      const def = shape[key]._def;
      if (def.defaultValue !== undefined) {
        defaults[key] =
          typeof def.defaultValue === "function"
            ? def.defaultValue()
            : def.defaultValue;
      }
    }

    return defaults;
  }
}

export default new RequestValidator();
