import {IncomingMessage} from "node:http";
import {User} from "../model/userTypes.ts";
import {PORT} from "../config/userServerConfig.ts";

export const getId = (req: IncomingMessage):number=> {
    // const {url} = req;
    const fURL = new URL(req.url!,`http://localhost:${PORT}`);
    return Number(fURL.searchParams.get("userId"));

}



export async  function parseBody(req: InstanceType<typeof IncomingMessage>) {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk.toString();
        })
        req.on('end', () => {
            try {
                resolve(JSON.parse(body))
            } catch (e) {
                reject(new Error('Invalid JSON'));
            }
        })
    })
}


export const findIndex = (users:User[],userId:number):number =>
    users.findIndex(elem => elem.id === userId)