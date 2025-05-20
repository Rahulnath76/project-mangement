export interface SuccessResponse {
  success: true;
  message: string;
  data: {
    token: string;
    user: object;
  };
}