import express from "express";
import dotenv from "dotenv";
import authRouter from "./routers/auth-routes";
import credentialRouter from "./routers/credential-routes";
import wifiRoutes from "./routers/wifi-routes";
dotenv.config();
const app = express();
app
.use(express.json())
.use(authRouter)
.use(credentialRouter)
.use(wifiRoutes)

const port = +process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});

export default app;
