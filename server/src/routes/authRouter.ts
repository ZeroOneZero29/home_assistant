import express from "express";
import authController from "../controllers/AuthController";

export const authRouter = express.Router();

authRouter.post("/login", authController.loginUserController);
authRouter.post("/registration", authController.regestrationUserController);
