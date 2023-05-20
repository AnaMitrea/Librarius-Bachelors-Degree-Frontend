export interface ApiResponseModel<T> {
  succeeded: boolean;
  result: T;
  errors: any[]
}
