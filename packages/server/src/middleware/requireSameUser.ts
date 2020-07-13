import { Request, Response, NextFunction } from "express";
import { findCurrentUser } from "../helpers";
import { User } from "../models/User";

export const requireSameUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.params.username;
  const currentUser = await findCurrentUser(req.user);
  if (!currentUser) {
    return res.status(401).json({
      success: false,
      message: "You must be logged in to perform this action",
    });
  } else if (currentUser instanceof User && username !== currentUser.username) {
    return res.status(401);
  } else {
    return next();
  }
};
