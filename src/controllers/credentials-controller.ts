import { Request, Response } from "express";
import httpStatus from "http-status";
import  credentialService from "../service/credential-service"

export async function createCredential(req:Request, res:Response){
const {url, username, password, title } = req.body
const userId = res.locals.user;
try{
await credentialService.createCredential({url,username,password,title,userId})
 return res.sendStatus(httpStatus.CREATED)   
}catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

}

export async function getUserCredentials(req:Request, res:Response) {
    const userId = res.locals.user;
    try {
        const userCredentials = await credentialService.crendentialById(userId)

        return res.status(httpStatus.OK).send(userCredentials)

    }catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getCredential(req:Request, res:Response) {
const {id} = req.params;
const userId = res.locals.user

try{
const credential = await credentialService.findCredential(parseInt(id),userId)
return res.status(httpStatus.OK).send(credential);
}catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }

  
}

export async function deletCredential(req:Request,res:Response) {
    const {id} = req.params;
    const userId = res.locals.user;

    try{
      await credentialService.deletCredential(parseInt(id),userId)
      return res.sendStatus(httpStatus.OK)
    }catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const crendential = {
    createCredential,
    getUserCredentials,
    getCredential,
    deletCredential
}

export default crendential