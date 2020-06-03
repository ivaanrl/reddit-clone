import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import passport from "passport";
import { authResponseMessages } from "./responseMessages/auth";

const {
  server_error,
  username_taken,
  user_created_successfully,
  invalid_combination,
  successful_login,
} = authResponseMessages;

@controller("/api/auth")
class LoginController {
  @post("/signin")
  @use(passport.authenticate("local-signin"))
  loginUser(req: Request, res: Response) {
    if (req.user == null) {
      return res.status(501).json({ success: false, message: server_error });
    }

    if (req.user == username_taken) {
      return res.status(401).json({ success: false, message: username_taken });
    }

    if (req.user == invalid_combination) {
      return res.status(401).json({
        success: false,
        message: invalid_combination,
      });
    }

    return res.status(201).json({
      success: true,
      message: successful_login,
    });
  }

  @post("/signup")
  @use(passport.authenticate("local-signup"))
  signinUser(req: Request, res: Response) {
    if (req.user == null) {
      return res.status(501).json({ success: false, message: "Server error" });
    }

    if (req.user == username_taken) {
      return res.status(401).send({ success: false, message: username_taken });
    }

    return res
      .status(201)
      .json({ success: true, message: user_created_successfully });
  }

  @get("/current_user")
  getCurrentUser(req: Request, res: Response) {
    res.json(req.user);
  }
}
