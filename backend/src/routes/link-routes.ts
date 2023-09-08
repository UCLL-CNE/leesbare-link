import { Request, Response, Express, NextFunction } from "express";
import { LinkService } from "../service/link-service";
import { Link } from "../domain/link";
import { authenticatedRoute, wrapRoute } from "./route-factory";

export const createLinkRoutes = (expressApp: Express, linkService: LinkService, userService: unknown) => {

  if (!expressApp || !linkService || !userService) {
    throw new Error("Not all services are initialised. Exiting...");
  }

  expressApp.get('/mappings', authenticatedRoute, (req: Request, res: Response, next: NextFunction) => {
    wrapRoute(async () => {
      const user = req.user!;
      const links = await linkService.getAllMappings(user);
      res.json(links);
    }, next);
  });

  expressApp.get('/:mapping', (req: Request, res: Response, next: NextFunction) => {
    wrapRoute(async () => {
      const link = await linkService.getLinkByMapping(req.params.mapping);
      res.redirect(link);
    }, next);
  });

  expressApp.put('/:mapping', authenticatedRoute, (req: Request, res: Response, next: NextFunction) => {
    wrapRoute(async () => {
      const user = req.user!;
      const newLink = new Link(req.body.link, req.params.mapping.toLowerCase(), user);
      await linkService.setLink(newLink);
      res.status(201).json(newLink);
    }, next);
  });

  expressApp.delete('/:mapping', authenticatedRoute, (req: Request, res: Response, next: NextFunction) => {
    wrapRoute(async () => {
      const user = req.user!;
      await linkService.removeLinkByMapping(req.params.mapping, user);
      res.send();
    }, next);
  });
}