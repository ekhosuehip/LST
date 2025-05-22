import { IUser } from "../interfaces/user";
import User from "../models/userModel";

class UserServices {
    // create user
    async createUser(data: IUser) {
        return await User.create(data)
    }

    // fetch user by email or phone
    async fetchUser(email: string, phoneNumber: string) {
        return await User.findOne({
            $or: [{ email: email }, { phoneNumber: phoneNumber }]
        });
    }

    // fetch all user
    async fetchAllUser() {
        return await User.find({})
    }
}

export const userService = new UserServices

export default userService