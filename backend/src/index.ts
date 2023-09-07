import express from 'express'
import cors from 'cors'
import { createLinkRoutes } from './routes/link-routes'
import { LinkService } from './service/LinkService'
import { SimpleUser, User } from './domain/user';
import { errorHandler } from './routes/route-factory';
import { createUserRoutes } from './routes/user-routes';

declare module "express-serve-static-core" {
  interface Request {
    user?: SimpleUser;
  }
}

const app = express()
app.use(cors())
app.use(express.json());

// Init services
const linkService = new LinkService();

// Create routes
createUserRoutes(app);
createLinkRoutes(app, linkService, {});

// Errorhandler needs to be registered last
app.use(errorHandler);

app.listen(3000, function () {
  console.log("Server listening on port 3000.");
})
