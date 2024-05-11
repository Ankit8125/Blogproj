import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite"

// now if anyone uses this class, they have to make a new method, so we create object here itself and pass the object
export class AuthService{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount){
                // call another method
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions(); // deletes Session of user from all devices
        } catch (error) {
            console.log("Appwrite service :: logout  :: error ", error);
        }
    }
}
const authService = new AuthService()
// now if anyone wants to access any method they can do 'authService.{method}'
export default authService
