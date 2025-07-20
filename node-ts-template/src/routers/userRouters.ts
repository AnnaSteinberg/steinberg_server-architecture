import {IncomingMessage, ServerResponse} from "node:http";
import {UserController} from "../controllers/UserController{.ts";
import {PORT} from "../config/userServerConfig.ts";
import {myLogger} from "../events/logger.ts";


export const userRouters =
    async ( req:IncomingMessage, res:ServerResponse, controller:UserController ) => {
    const {url,method}= req;
    const fURL = new URL(url!,`http://localhost:${PORT}`);

    switch (fURL.pathname + method){
        case '/api/users' + 'POST':{
            await controller.addUser(req,res);
            break;
        }
        case '/api/users' + 'GET':{
            await controller.getUsers(req,res)
            break;
        }
        case '/api/user_update' + 'PUT':{
            await controller.updateUser(req,res);
            break;
        }
        case "/api/user_delete" + "DELETE": {
            await controller.removeUserById(req,res)
            break;
        }
        case "/api/user" + "GET":{
            await controller.getUserById(req,res);
            break;
        }
        case '/api/logger' + 'GET':{
            const allLogs = myLogger.getLogArray()
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(allLogs));
            break;
        }

        default:{
            myLogger.log(fURL.pathname + method)
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("Page Not Found!");
        }
    }
}