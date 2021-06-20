import { NextFunction, Request, Response } from "express";
import { addObjectInArrayFile } from "../utils";

export const logger = (req: Request, _: Response, next: NextFunction) => {
  const reqData = {
    method: req.method,
    originalUrl: req.originalUrl,
    headers: req.headers,
    timestamp: new Date(),
  };
  console.info(
    `[${reqData.method}] > ${reqData.originalUrl} from ${reqData.headers.host} `
  );
  addObjectInArrayFile("src/logger/logger.json", reqData);
  next();
};
