import Joi from "joi";
import { Credential } from "@prisma/client";

type CredentialType = Omit<Credential, "id">

export const credentialSchema = Joi.object<CredentialType>({
    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
})