import { Application } from "express-ws";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";

export function getLogout(app: Application) {
    app.get("/logout", authenticationMiddleware, (req, res) => {
        res.clearCookie("ssid");

        res.status(302).send("/login");
    });
}