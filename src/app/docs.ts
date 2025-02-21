import { END_PONITS } from '@/app/endpoints';
import { generateOpenApiDocument } from '@/helpers/openapi/openapi-generator';
import { postRegistry } from '@/modules/post/post.registry';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const router = Router();
export { router as docsRoute };

const registries: OpenAPIRegistry[] = [postRegistry];
const openApiDocument = generateOpenApiDocument(registries);

router.use(
  END_PONITS.DOCS.UI,
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument)
);

router.get(END_PONITS.DOCS.JSON, (_, res) => {
  res.json(openApiDocument);
});
