import {User} from "../model/userTypes.ts";


export interface UserService {
    addUser(user: User):boolean;
}