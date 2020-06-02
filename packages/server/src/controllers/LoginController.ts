import { Request, Response } from "express";
import { get, controller, use } from "./decorators";
import passport from "passport";
import "../services/passport";

@controller("/api/auth")
class LoginController {
  @get("/some/route")
  getSomeRoute(req: Request, res: Response) {
    res.send(req.body);
  }
}
