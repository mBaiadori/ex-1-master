import { NextFunction, Request, Response } from "express";

export const endpoint_a = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  //
  next();
};
