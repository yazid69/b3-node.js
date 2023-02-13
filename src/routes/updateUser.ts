import { Application } from "express-ws";
import { updateUser } from "../repositories/userRepository";

export function updateUser(app: Application) {
    app.post("/update", async (req, res) => {
        const id = req.signedCookies.ssid;
        const { name, email } = req.body;

        const user = await updateUser(id, name, email);
        if (!user) {
            res.status(401).send("User not found");
            return;
        }
        res.redirect("/");
    });
}