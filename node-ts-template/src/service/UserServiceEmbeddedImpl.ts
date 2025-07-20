import {UserService} from "./userService.ts";
import {User} from "../model/userTypes.ts";
import {findIndex} from "../utils/tools.ts";


export class UserServiceEmbeddedImpl implements UserService{
    private users:User[] =[{id: 1, userName: "John"}];

    addUser(user: User): boolean {
        if(this.users.findIndex((u:User)=>u.id === user.id) === -1){
            this.users.push(user);
            return true;
        }
        return false;
    }

    getAllUsers = ()=> [...this.users];


    updateUser = (newUserData: User):boolean => {
        const index = findIndex(this.users,newUserData.id)
        if( index === -1) {
            return false}
        else{
            this.users[index].userName = newUserData.userName
            return true
        }
    }

    removeUser(userId:number):User|null {
        const index = findIndex(this.users, userId)
        if( index === -1){
            return null
        }
        else{
            return this.users.splice(index, 1)[0]
        }
    }

    getUser(userId: number):User|null{
        const index = findIndex(this.users, userId)
        if( index === -1){
            return null
        }else{
            return this.users[index]
        }
    }

}