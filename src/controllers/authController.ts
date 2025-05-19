import { Request, Response, NextFunction } from "express";
import userService from "../services/userServices";
import accService from "../services/accountServices";
import bcrypt from 'bcrypt';
import encryptLib from "../utils/encryptLib";
import generateNumber from "../utils/account";
import configData from "../configs/config";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const {firstName, surname, email, phoneNumber, dateOfBirth, password} = req.body;

    try {
        // check if email or phone already existed
        const existingUser = await userService.fetchUser(email, phoneNumber);
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: 'Email or phone already used'
            })
            return;
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // encryption dateOfBirth
        const encryptedDoB = encryptLib.encrypt(dateOfBirth, configData.appKey.key as string);
        const encryptedPhone = encryptLib.encrypt(phoneNumber, configData.appKey.key as string);

        const newUser = {
            firstName: firstName,
            surname: surname,
            email: email,
            phoneNumber: encryptedPhone,
            dateOfBirth: encryptedDoB,
            password: hashedPassword
        };

        const createdUser = await userService.createUser(newUser);

        const accNumber = generateNumber(createdUser._id, phoneNumber, configData.appKey.key as string, 10);
        const cardNumber = generateNumber(createdUser._id, phoneNumber, configData.appKey.cardKey as string, 16);
        const cvv = generateNumber(createdUser._id, phoneNumber, configData.appKey.cvvKey as string, 3);
        
        const today = new Date();

        // Add 3 years to the current year
        const futureYear = today.getFullYear() + 3;

        // Get the current month (1 to 12)
        const month = (today.getMonth() + 1).toString().padStart(2, '0');

        // Get the last two digits of the year (e.g. 2028 -> "28")
        const year = futureYear.toString().slice(-2);
        const expiryDate = `${month}/${year}`;

        console.log(expiryDate);
        console.log(cvv);
        console.log(cardNumber);
        

        const encryptedCardNumber = encryptLib.encrypt(cardNumber, configData.appKey.cardKey as string);
        const encryptedCVV = encryptLib.encrypt(cvv, configData.appKey.cvvKey as string);
        const encryptedExpiryDate = encryptLib.encrypt(expiryDate, configData.appKey.key as string);

        const newAcc = {
            _id: createdUser._id,
            accNumber: accNumber,
            cardNumber: encryptedCardNumber,
            cvv: encryptedCVV,
            expiryDate: encryptedExpiryDate
        }

        const createdAcc = await accService.createAccount(newAcc)
        
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            accountData: createdAcc,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error || 'Internal server error'
        })
        return;
    }
}