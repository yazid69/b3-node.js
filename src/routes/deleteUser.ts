import bodyParser from "body-parser";
import { Application, Router } from "express";
import { deleteUser } from "../repositories/userRepository";

export function user(app: Application) {
    app.delete('/profile', bodyParser.urlencoded(), async (req, res) => {
        try {
          console.log(req.body)
          const id = req.body.id;
          const user = await deleteUser(id)
          if (!id) {
            res.status(401).send('Error');
            return;        
          };
          res.redirect('/login');
        } catch (e) {
          res.status(500).send('Internal Server Error')
        }
})
    //app.delete('/:id', (req, res, next) => {
      //  const id = String (req.params.id)
        //const userId = user.findUserById(id => userId === id) 
          //return res.redirect("/login");
        //});
      }