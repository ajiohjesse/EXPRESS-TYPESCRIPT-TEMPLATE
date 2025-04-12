import type { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { postRegistry } from "../posts/post.registry";

const apiDocsRegistry: OpenAPIRegistry[] = [postRegistry];

export default apiDocsRegistry;
