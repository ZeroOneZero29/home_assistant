import { Response, Request } from "express";
import authUserService from "../services/authUserService";
class ExampleController {
  public static async loginUserController(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body.email;
      const password = req.body.password;
      console.log(email, password);

      const userDate = authUserService.createUser(email, password);
      userDate.then((e) => res.send(e));
      // Business logic to handle GET request
      //res.status(200).json({ message: "GET request handled successfully" });
    } catch (e) {
      res.status(500).json({ e: "Internal server error" });
    }
  }

  public static async regestrationUserController(req: Request, res: Response): Promise<void> {
    try {
    } catch (e) {
      res.status(500).json({ e: "Internal server error" });
    }
  }
}

export default ExampleController;
