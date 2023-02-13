import { Application } from "express-ws"
import path from "path"
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware"
import { findUserById } from "../repositories/userRepository"

export function getProfile(app:Application) {
    app.get('/profile',authenticationMiddleware,async (req, res) => {
        const user = await findUserById(req.signedCookies.ssid)
        if (req.signedCookies.ssid) {
            res.redirect('/login')
            return
        }
        res.sendFile(path.join(__dirname, '../../pages/profile.html'))
      })
}