import { Application } from "express";
import path from "path"

export function getRegister(app: Application) {
    app.get('/register', (req, res) => {
        if (req.signedCookies.ssid) {
            res.redirect('/')
            return
        }
        res.sendFile(path.join(__dirname, '../../pages/register.html'))
      })
}