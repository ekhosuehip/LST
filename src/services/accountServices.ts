import { IAccount, PopulatedAccount } from "../interfaces/account";
import Accounts from "../models/accountModel";

class AccountServices {
    // Create Account
    async createAccount(data: IAccount) {
        return await Accounts.create(data);
    }

    // Fetch all accounts
    async fetchAccounts(): Promise<PopulatedAccount[]> {
        const accounts = await Accounts.find({}, { _id: 0, createdAt: 0, updatedAt: 0 })
            .populate<{ user: { firstName: string; surname: string } }>('user', 'firstName surname -_id')

        return accounts;
    }
}

const accService = new AccountServices();

export default accService;
