import type { Response } from "express";
import { errors } from "./errors";

export const assertUser = (res: Response) => {
  const userId = res.locals.userId;
  if (!userId) throw errors.authenticationError;
  return userId;
};
