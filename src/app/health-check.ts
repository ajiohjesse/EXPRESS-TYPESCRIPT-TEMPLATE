import { END_PONITS } from '@/app/endpoints';
import { sendResponse } from '@/helpers/response';
import { Router } from 'express';

const router = Router();
export { router as healthCheckRoute };

router.get(END_PONITS.HEALTH_CHECK, (_, res) => {
  sendResponse(res, {
    type: 'success',
    statusCode: 200,
    message: 'Server is running',
    data: null,
  });
});
