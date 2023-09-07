import { Request, Response, Express } from "express";
import { LinkService } from "../service/LinkService";
import { Link } from "../domain/link";
import { authenticatedRoute } from "./route-factory";

export const createLinkRoutes = (expressApp: Express, linkService: LinkService, userService: unknown) => {

  if (!expressApp || !linkService || !userService) {
    throw new Error("Not all services are initialised. Exiting...");
  }

  expressApp.get('/:mapping', (req, res) => {
    const link = linkService.getLinkByMapping(req.params.mapping);
    res.redirect(link);
  });

  expressApp.put('/:mapping', authenticatedRoute, (req: Request, res: Response) => {
    const user = req.user!;
    const newLink = new Link(req.body.link, req.params.mapping, user);
    linkService.setLink(newLink);
    res.json(newLink);
  });

  expressApp.delete('/:mapping', authenticatedRoute, (req: Request, res: Response) => {
    const user = req.user!;
    linkService.removeLinkByMapping(req.params.mapping, user);
    res.send();
  })
}