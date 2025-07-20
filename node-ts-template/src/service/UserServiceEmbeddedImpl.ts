import {UserService} from "./userService.ts";
import {User} from "../model/userTypes.ts";


export class UserServiceEmbeddedImpl implements UserService{
    private users:User[] =[];
    addUser(user: User): boolean {
        if(this.users.findIndex((u:User)=>u.id === user.id) === -1){
            this.users.push(user);
            return true;
        }
        return false;
    }
}