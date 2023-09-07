import { Express, NextFunction, Request, Response } from "express";
import { unauthenticatedRoute, wrapRoute } from "./route-factory";
import { CustomError } from "../domain/custom-error";
import { UserService } from "../service/UserService";

export const createUserRoutes = (expressApp: Express) => {

  expressApp.post('/login', unauthenticatedRoute, (req: Request, res: Response, next: NextFunction) => {
    wrapRoute(async () => {
      const {
        email, password
      } = req.body;

      if (!email || !password) {
        throw CustomError.invalid("Please provide an email and password to login.");
      }

      const user = await UserService.getInstance().getUser(email);
      await user.validate(password)
      res.json({ email });
    }, next);
  });

  expressApp.post('/register', unauthenticatedRoute, (req: Request, res: Response, next: NextFunction) => {
    wrapRoute(async () => {
      const {
        email, password
      } = req.body;

      if (!email || !password) {
        throw CustomError.invalid("Please provide an email and password to register.");
      }

      await UserService.getInstance().addUser(email, password);
      res.status(201).json({ email });
    }, next);
  })
}