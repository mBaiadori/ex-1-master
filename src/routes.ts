import { Router } from "express";
import asyncHandler from "express-async-handler";
import { articleController, authorsController } from "./controllers";

const r = Router();

r.get("/authors/list", asyncHandler(authorsController.list));
//Articles
r.post("/article", asyncHandler(articleController.post));
r.put("/article", asyncHandler(articleController.put));
r.delete("/article", asyncHandler(articleController.del));

export default r;
