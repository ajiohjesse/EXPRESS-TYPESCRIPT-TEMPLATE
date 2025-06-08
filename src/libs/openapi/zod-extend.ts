import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import z from "zod";

//adds the openapi methods to zod schemas
extendZodWithOpenApi(z);

export { z };
