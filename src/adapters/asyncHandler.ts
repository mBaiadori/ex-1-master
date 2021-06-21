import { Handler, NextFunction, Request, Response } from "express";

export const asyncHandler = (handleFn: Handler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(handleFn(req, res, next)).catch((e) => next(e));
  };
};
