import { Request, Response } from "express";
import httpStatus from "http-status";
import wifiService from "../service/wifi-service";

export async function createWifi(req: Request, res: Response) {
  const { title, network, password } = req.body;
  const userId = res.locals.user;
  try {
    await wifiService.createWifi({ title, network, password, userId });

    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getWifiUser(_req: Request, res: Response) {
  const userId = res.locals.user;
  try {
    const getWifi = await wifiService.getUserWifi(userId);
    return res.status(httpStatus.OK).send(getWifi);
  } catch (err) {
    console.log(err);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getWifi(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user;
  try {
    const wifi = await wifiService.findWif(parseInt(id), userId);

    return res.status(httpStatus.OK).send(wifi);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function deletWifi(req: Request, res: Response) {
  const { id } = req.params;
  const userId = res.locals.user;

  try {
    await wifiService.deletWifi(parseInt(id), userId);
    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    console.log(err);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

const wifiControler = {
  createWifi,
  getWifiUser,
  getWifi,
  deletWifi,
};

export default wifiControler;
