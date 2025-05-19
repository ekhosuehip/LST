import { IAccount } from "../interfaces/account";
import Accounts from "../models/accountModel";

class AccountServices {
    // create Account
    async createAccount(data: IAccount) {
        return await Accounts.create(data)
    }

    //fetch all accounts
    async fetchAccounts() {
        return await Accounts.find({}, { _id: 0 })
            .populate('user', 'firstName surname')
    } 
}

const accService = new AccountServices

export default accService