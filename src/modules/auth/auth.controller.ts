import { authenticationError } from '@/helpers/errors';
import requestValidator from '@/helpers/request-validator';
import type { RequestHandler } from 'express';
import { z } from 'zod';
import { sendResponse } from './../../helpers/response';
import authService from './auth.service';
import { loginResponseSchema } from './auth.validator';

class AuthController {
  login: RequestHandler = async (_req, res) => {
    const userData = await authService.login();

    const { body } = requestValidator.validate(_req, {
      body: z.object({ name: z.string() }),
    });

    console.log(body);

    sendResponse<typeof loginResponseSchema>(res, {
      type: 'success',
      statusCode: 200,
      message: 'Logged in successfully',
      data: userData,
    });
  };

  register: RequestHandler = async (_req, res) => {
    const userData = await authService.register();
    sendResponse<typeof loginResponseSchema>(res, {
      type: 'success',
      statusCode: 201,
      message: 'Registered successfully',
      data: userData,
    });
  };

  logout: RequestHandler = async (_req, res) => {
    const userId = res.locals.userId;
    if (!userId) throw authenticationError;

    sendResponse(res, {
      type: 'success',
      statusCode: 204,
      message: 'Logged out successfully',
      data: null,
    });
  };
}

export default new AuthController();
