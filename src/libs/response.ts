import type { APIResponse } from "@/types";
import type { Response } from "express";
import type { infer as ZodInfer, ZodSchema } from "zod";

type SendResponseWithSchema<T extends ZodSchema> = {
  type: "success" | "error";
  statusCode: number;
  message: string;
  data: ZodInfer<T>;
};

type SendResponseWithoutSchema = {
  type: "success" | "error";
  statusCode: number;
  message: string;
  data: null;
};

type SendResponseProps<T extends ZodSchema | undefined = undefined> =
  T extends ZodSchema ? SendResponseWithSchema<T> : SendResponseWithoutSchema;

export const sendResponse = <T extends ZodSchema | undefined = undefined>(
  res: Response,
  props: SendResponseProps<T>
) => {
  const { type, message, statusCode, data } = props;

  const responseData: APIResponse<typeof data> = {
    success: type === "success",
    message,
    data: data,
  };

  res.status(statusCode).json(responseData).end();
};

type PaginatedResponseProps<T extends ZodSchema | undefined = undefined> =
  T extends ZodSchema
    ? {
        message: string;
        data: {
          items: ZodInfer<T>[];
          meta: {
            page: number;
            limit: number;
            totalItems: number;
          };
        };
      }
    : {
        statusCode: number;
        message: string;
        data: null;
      };

export const sendPaginatedResponse = <
  T extends ZodSchema | undefined = undefined,
>(
  res: Response,
  props: PaginatedResponseProps<T>
) => {
  const { message, data } = props;

  const responseData: APIResponse<typeof data> = {
    success: true,
    message,
    data,
  };

  res.status(200).json(responseData).end();
};
