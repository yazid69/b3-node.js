import expressWs, { Application } from "express-ws";
import express, { NextFunction, Request, Response } from "express";
import cookieParser from 'cookie-parser'
import path from 'path'
import { getLogin } from "./routes/getLogin";
import { getRoot } from "./routes/getRoot";
import { getWs } from "./routes/getWs";
import { postLogin } from "./routes/postLogin";
import { authenticationMiddleware } from "./middlewares/authenticationMiddleware";
import { getRegister } from "./routes/getRegister";
import { postRegister } from "./routes/postRegister";
import { deleteUser } from "./repositories/userRepository";
import { postProfile } from "./routes/postProfile";
import { getProfile } from "./routes/getProfile";
import { getLogout } from "./routes/getLogout";
import { getChat } from "./routes/getChat";
import { updateUser } from "./repositories/userRepository";


const SECRET_KEY = 'MySecretKeyIsAwesome';

function main() {
  const app = express() as unknown as Application;
  expressWs(app);
  const sockets = new Map();

  app.use((req, res, next) => {
    console.log(Date.now(), req.method, req.path)
    next()
  })
  app.use(cookieParser(SECRET_KEY))
  app.use(express.static(path.join(__dirname, '../public')))

  getRegister(app)
  postRegister(app)
  getLogin(app)
  postLogin(app)


  app.use(authenticationMiddleware)
  getLogout(app)
  getChat(app)
  getProfile(app)
  postProfile(app)
  updateUser(app)
  deleteUser(app)
  getWs(app, sockets)
  getRoot(app)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).send('Internal Server Error')

    next()
  })

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}

main()
