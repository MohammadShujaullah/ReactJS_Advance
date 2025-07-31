import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {                          //classs 
    client = new Client();
    account;                                  // 1stly you have to make client ,then account is made, so only (account )is written here
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)  // (ye syntax apprite ka ha.)
            .setProject(conf.appwriteProjectId)      // (jab client create hojae, tabhi account bnegaa, islie account baad main hmne create kia)

        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);   // you have to follow the appwrite syntex in inner part.


            if(userAccount){
                  // call another method // jab account create hojaega, phir user ko login page pr laogenaa
                  return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }
    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }
    // i am login or logout is determine by below function (means it return our current situation)

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            if (error.code === 401) {
                console.warn("User is not logged in.");
            } else {
                console.error("Appwrite getCurrentUser error:", error);
            }
            return null;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSessions();
        }
        catch (error) {
            console.log('appwrite service::logout::error', error)
        }
    }
}

const authService = new AuthService()        // object 

export default authService