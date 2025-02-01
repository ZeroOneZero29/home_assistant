"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT_SERVER;
console.log(port);
app.use((0, cors_1.default)());
app.listen(port, () => {
    console.log(port);
});
app.get("/", (req, res) => {
    res.send("/dada");
});
//# sourceMappingURL=index.js.map