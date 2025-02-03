import "reflect-metadata";
import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { authRouter } from "./routes/authRouter";
import { deviceRouter } from "./routes/deviceRouter";

const app = express();
dotenv.config();
const port = process.env.PORT_SERVER;

console.log(port);
app.use(cors());
app.use(bodyParser.json());
app.use("/user", authRouter);
app.use("/device", deviceRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("/dada");
});

app.post("/saveData", (req, res) => {
  console.log("Using Body-parser: ", req.body.email);
  res.send("ne");
});

//const start = async () => {
//  await createConnection();

app.listen(port, () => {
  console.log(`The server is listening on port ${port}`);
});

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
