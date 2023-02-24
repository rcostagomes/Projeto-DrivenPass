import wifiControler from "../controllers/wifi-controller";
import { Router } from "express";
import auth from "../middlewares/auth-middleware";
import validate from "../middlewares/validate-schema";
import { wifiSchema } from "../models/wifi-schema";

const wifiRoutes = Router();

wifiRoutes.post("/wifi",validate.validateWifi(wifiSchema),auth.hasToken, wifiControler.createWifi);
wifiRoutes.get("/wifi", auth.hasToken, wifiControler.getWifiUser);
wifiRoutes.get("/wifi/:id", auth.hasToken, wifiControler.getWifi);
wifiRoutes.delete("/wifi/:id", auth.hasToken, wifiControler.deletWifi);
export default wifiRoutes;
