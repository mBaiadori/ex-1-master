export class FieldError extends Error {
  statusCode: Number;
  constructor(message?: string) {
    super(message);
    this.name = 'FieldError';
    this.statusCode = 400;
  }
}
export class NoDataError extends Error {
  statusCode: Number;
  constructor(message?: string) {
    super(message);
    this.name = 'NoDataError';
    this.statusCode = 404;
  }
}
