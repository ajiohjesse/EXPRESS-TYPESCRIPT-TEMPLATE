import { API_ROUTES } from '@/app/constants';
import { sendResponse } from '@/helpers/response';
import { Router } from 'express';

const router = Router();
export { router as healthCheckRoute };

router.get(API_ROUTES.HEALTH_CHECK, (_, res) => {
  sendResponse(res, {
    type: 'success',
    statusCode: 200,
    message: 'Server is running',
    data: null,
  });
});
