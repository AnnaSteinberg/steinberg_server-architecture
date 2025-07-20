import {UserService} from "../service/userService.ts";
import {getId, parseBody} from "../utils/tools.ts";
import {User} from "../model/userTypes.ts";
import {IncomingMessage, ServerResponse} from "node:http";
import {myLogger} from "../events/logger.ts";


export class UserController {
    constructor(private userService: UserService) {
    }

    async addUser(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as User
        if (body && (body as User).id) {
            this.userService.addUser(body)
            res.writeHead(201, {'Content-Type': 'text/plain'});
            res.end(`User  ${body.id} was added successfully!`);//${body.id}
            myLogger.log('Response for add user with id ' + body.id + ' was send successfully!');
            myLogger.addLogToArray(`User with id ${body.id} was successfully added!`)
        } else {
            res.writeHead(409, {'Content-Type': 'text/plain'});
            res.end("User already exists!");
            myLogger.save(`User with id ${body.id} already exists!`);
            myLogger.log(`User with id ${body.id} already exists!`);
        }


    }

    async getUsers(req: IncomingMessage, res: ServerResponse) {

        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify((this.userService.getAllUsers())));


    }

    async updateUser(req: IncomingMessage, res: ServerResponse) {
        const body = await parseBody(req) as User
        if (body && (body as User).id) {
            this.userService.updateUser(body as User)
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(`User ${body.id} was updated successfully!`);
            myLogger.addLogToArray("Users ${body.id} was  updated successfully!")
            myLogger.log(`Users ${body.id} was  updated successfully!`)
        }else {
            res.writeHead(409, {'Content-Type': 'text/plain'});
            res.end("Users data don't update!");
            myLogger.addLogToArray("Users data don't update!")
        }
    }

    async removeUserById(req: IncomingMessage, res: ServerResponse) {

        const userId = getId(req)
        const deleted = this.userService.removeUser(userId);
        if (deleted) {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(deleted));
            myLogger.log(`User with id ${userId} was deleted!`);
            myLogger.addLogToArray(`User with id ${userId} was deleted!`)
        }else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end("User not found!");
        }
    }

    async getUserById(req: IncomingMessage, res: ServerResponse) {
        const id = getId(req);
        const user = this.userService.getUser(id);
        if (user){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }else {
            res.writeHead(409, {'Content-Type': 'text/plain'});
            res.end("User not found!");}
    }
}