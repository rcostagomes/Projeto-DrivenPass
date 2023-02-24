import { Router } from "express";
import crendential from "../controllers/credentials-controller";
import validate from "../middlewares/validate-schema";
import auth from "../middlewares/auth-middleware";
import { credentialSchema } from "../models/credential-schemas";

const credentialRouter = Router();

credentialRouter.post(
  "/credentials",
  validate.validateCredential(credentialSchema),
  auth.hasToken,
  crendential.createCredential
);

credentialRouter.get(
  "/credentials",
  auth.hasToken,
  crendential.getUserCredentials
);
credentialRouter.get(
  "/credentials/:id",
  auth.hasToken,
  crendential.getCredential
);
credentialRouter.delete(
  "/credentials/:id",
  auth.hasToken,
  crendential.deletCredential
);

export default credentialRouter;
