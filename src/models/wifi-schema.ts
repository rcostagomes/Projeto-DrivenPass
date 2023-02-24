import joi from "joi"
import { Wifi } from "../protocols/wifi-protocols"

export const wifiSchema = joi.object<Wifi>({
    title: joi.string().required(),
    network: joi.string().required(),
    password: joi.string().required(),
    userId: joi.number().required()
})