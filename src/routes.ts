import { Router } from "express";
import { articleController, authorsController } from "./controllers";

const r = Router();

r.get("/authors/list", authorsController.list);
//Articles
r.post("/article", articleController.post);
r.put("/article", articleController.put);
r.delete("/article", articleController.del);

export default r;
