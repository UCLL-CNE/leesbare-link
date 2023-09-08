import { Express, NextFunction, Request, Response } from "express";
import { unauthenticatedRoute, wrapRoute } from "./route-factory";
import { CustomError } from "../domain/custom-error";
import { UserService } from "../service/user-service";

export const createUserRoutes = (expressApp: Express, userService: UserService) => {

  expressApp.post('/login', unauthenticatedRoute, (req: Request, res: Response, next: NextFunction) => {
    wrapRoute(async () => {
      const {
        email, password
      } = req.body;

      if (!email || !password) {
        throw CustomError.invalid("Please provide an email and password to login.");
      }

      const user = await userService.getUser(email);
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

      await userService.addUser(email, password);
      res.status(201).json({ email });
    }, next);
  })
}