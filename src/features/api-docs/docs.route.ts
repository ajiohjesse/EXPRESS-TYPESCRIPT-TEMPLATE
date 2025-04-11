import { END_PONITS } from '@/constants/endpoints';
import { generateOpenApiDocument } from '@/helpers/openapi/openapi-generator';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiDocsRegistry from './docs.registry';

const router = Router();
export { router as docsRoute };

const openApiDocument = generateOpenApiDocument(apiDocsRegistry);

router.use(
  END_PONITS.DOCS.UI,
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument)
);

router.get(END_PONITS.DOCS.JSON, (_, res) => {
  res.json(openApiDocument);
});
