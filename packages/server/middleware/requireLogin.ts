import { Request, Response, NextFunction } from "express";

export const requireLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("requiring login");
  console.log(req.user);
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: "You must be logged in to perform this action",
    });
  }

  return next();
};
