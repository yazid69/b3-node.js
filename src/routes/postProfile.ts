import bodyParser from "body-parser";
import { Application } from "express-ws";
import { updateUser } from "../repositories/userRepository";

export function postProfile(app: Application){
    app.post("/profile", bodyParser.urlencoded(), async (req, res) => {
          const {name, email } = req.body;
          if (!name || !email) {
            res.status(400).send("Bad Request");
            return;
          }
    
          const user = await updateUser(req.signedCookies.ssid, name, email)
          if (!user) {
            res.status(400).send("Email Alread Used");
            return
    }
    res.send('Changement effectué');
          }
      )
}
