import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "../controllers/UserController{.ts";


export const userRouters =
    async ( req:IncomingMessage, res:ServerResponse, controller:UserController ) => {
    const {url,method}= req;

    switch (url! + method){
        case '/api/users' + 'POST':{
            await controller.addUser(req,res);
            break;
        }

        default:{
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("Page Not Found!");
        }
    }
}