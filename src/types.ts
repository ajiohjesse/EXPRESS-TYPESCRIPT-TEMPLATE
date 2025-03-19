export type AppResponseData<T extends Record<string, unknown> | null = null> = {
  success: boolean;
  message: string;
  data: T;
};
