import express from "express";
import deviceController from "../controllers/deviceController";

export const deviceRouter = express.Router();

deviceRouter.post("/info", deviceController.changeStateDevice);
deviceRouter.get("/info_id");
deviceRouter.post("/action");
