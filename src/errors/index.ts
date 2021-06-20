export class FieldError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "FieldError";
    //@ts-ignore
    this.statusCode = 401;
  }
}
