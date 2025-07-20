import {UserService} from "../service/userService.ts";
import {parseBody} from "../utils/tools.ts";
import {User} from "../model/userTypes.ts";
import {IncomingMessage, ServerResponse} from "node:http";


export class UserController{
    constructor(private  userService:UserService) {}

        async addUser(req:IncomingMessage, res:ServerResponse) {
            const body = await parseBody(req)
            // const body = await parseBody(req) as User;
            if (body && (body as User).id) {
                this.userService.addUser(body as User)
                // myLogger.save(`User with id ${body.id} was successfully added!`);

                res.writeHead(201, {'Content-Type': 'text/plain'});
                res.end(`User  was added successfully!`);//${body.id}
                // emitter.emit('user_added')
                // myLogger.log('Response for add user with id ' + body.id + ' was send successfully!');
            } else {
                res.writeHead(409, {'Content-Type': 'text/plain'});
                res.end("User already exists!");
                // myLogger.save(`User with id ${body.id} already exists!`);
                // myLogger.log(`User with id ${body.id} already exists!`);
            }
        }


}