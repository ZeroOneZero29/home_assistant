"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
//import { authController } from "../controllers/AuthController";
exports.authRouter = express_1.default.Router();
exports.authRouter.get("/registration", (req, res) => {
    res.send("tesr");
});
//# sourceMappingURL=authRouter.js.map