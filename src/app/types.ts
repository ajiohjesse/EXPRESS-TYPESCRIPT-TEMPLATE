export type AppResponseData<T extends Record<string, any> | null = null> = {
  success: boolean;
  message: string;
  data: T;
};
