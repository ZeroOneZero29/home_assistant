"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import "reflect-metadata";
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
//import { authRouter } from "./routes/authRouter";
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT_SERVER;
console.log(port);
//app.use("/api", authRouter);
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("/dada");
});
//const start = async () => {
//  await createConnection();
//  app.listen(port, () => {
//    console.log(`The server is listening on port ${port}`);
//  });
//};
//start().catch(console.error);
//AppDataSource.initialize()
//  .then(() => {
//    console.log("Data Source has been initialized!");
//    Test(photoRepository);
//    XZ();
//  })
//  .catch((err) => {
//    console.error("Error during Data Source initialization", err);
//  });
//const photoRepository = AppDataSource.getRepository(User);
//async function Test(photoRepository: any) {
//  const savedPhotos = await photoRepository.findOneBy({
//    id: 3,
//  });
//  if (savedPhotos == null) {
//    console.log("Пользователь не найден");
//  }
//  //console.log("All photos from the db: ", savedPhotos);
//}
//# sourceMappingURL=index.js.map