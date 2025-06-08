export type APIResponse<T extends Record<string, unknown> | null = null> = {
  success: boolean;
  message: string;
  data: T;
};

export type APIPagination = {
  page: number;
  limit: number;
  totalItems: number;
};
