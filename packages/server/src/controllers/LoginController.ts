import { Request, Response } from "express";
import { get, controller, use, post } from "./decorators";
import "../services/passport";
import passport from "passport";
import { authResponseMessages } from "./responseMessages/auth";
import { User } from "../models/User";

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
  signinUser(req: Request, res: Response) {
    if (req.user == null) {
      req.logOut();
      return res.status(501).json({ success: false, message: server_error });
    }

    if (req.user == username_taken) {
      req.logOut();
      return res.status(401).json({ success: false, message: username_taken });
    }

    if (req.user == invalid_combination) {
      req.logOut();
      return res.status(401).json({
        success: false,
        message: invalid_combination,
      });
    }

    const { username, email, karma } = req.user as {
      userid: string;
      username: string;
      email: string;
      karma: number;
    };

    return res.status(201).json({
      success: true,
      message: successful_login,
      user: {
        username,
        email,
        karma,
      },
    });
  }

  @post("/signup")
  @use(passport.authenticate("local-signup"))
  signupUser(req: Request, res: Response) {
    console.log("signup");
    if (req.user == null) {
      req.logOut();
      return res.status(501).json({ success: false, message: "Server error" });
    }

    if (req.user == username_taken) {
      req.logOut();
      return res.status(401).json({ success: false, message: username_taken });
    }

    const { username, email, karma } = req.user as {
      userid: string;
      username: string;
      email: string;
      karma: number;
    };

    console.log(req.user);

    return res.status(201).json({
      success: true,
      message: user_created_successfully,
      user: {
        username,
        email,
        karma,
      },
    });
  }

  @get("/current_user")
  getCurrentUser(req: Request, res: Response) {
    res.json(req.user);
  }

  @post("/checkEmail")
  async checkEmail(req: Request, res: Response) {
    try {
      const existingUser = await (async () => {
        return await User.findOne({
          where: {
            email: req.body.email,
          },
        });
      })();

      if (existingUser) {
        res.status(201).json(false);
      } else {
        res.status(201).json(true);
      }
    } catch (error) {
      res.status(501).send();
    }
  }
}

const getUser = async (req: Request) => {
  return await User.findOne({
    where: {
      email: req.body,
    },
  });
};
