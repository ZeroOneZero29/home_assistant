import { Request, Response } from "express";
import getInfoDevice from "../services/deviceService";

class deviceController {
  public static async changeStateDevice(req: Request, res: Response): Promise<void> {
    try {
      const result = getInfoDevice.changeState();

      result.then((data) => res.json(data));
      result.then((date) => console.log(date));
    } catch (e) {
      res.status(500);
    }
  }
}

export default deviceController;
