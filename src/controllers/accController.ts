import { Request, Response, NextFunction} from 'express';
import accService from '../services/accountServices';
import encryptLib from '../utils/encryptLib';
import configData from '../configs/config';

export const listAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // fetch all accounts
        const allAccounts = await accService.fetchAccounts();
        if (!allAccounts || allAccounts.length == 0) {
            res.status(400).json({
                success: false,
                message: 'Zubairu says "No account found"'
            })
            return;
        }

        const accounts = allAccounts.map((acct) => {
            return {
               fullName: `${acct.user.firstName} ${acct.user.surname}`,
               accountNumber: acct.accNumber,
               phoneNumber: {
                encrypted: acct.user.phoneNumber,
                decrpted: encryptLib.decrypt(acct.user.phoneNumber, configData.appKey.key as string)
               },
               dateOfBirth: {
                encrypted: acct.user.dateOfBirth,
                decrpted: encryptLib.decrypt(acct.user.dateOfBirth, configData.appKey.key as string)
               },
               cardNumber: {
                encrpted: acct.cardNumber,
                decrpted: encryptLib.decrypt(acct.cardNumber, configData.appKey.cardKey as string)
               },
               cvv: {
                encrpted: acct.cvv,
                decrpted: encryptLib.decrypt(acct.cvv, configData.appKey.cvvKey as string)
               },
               expiryDate: {
                encrpted: acct.expiryDate,
                decrpted: encryptLib.decrypt(acct.expiryDate, configData.appKey.key as string)
               }
            }
        })

        res.status(200).json({
            success: true,
            message: "You're now in the territory of Zubairu and your fetch was successful",
            accountsData: accounts
        })
        return;
    } catch (error) {
        res.status(500).json({
            success: true,
            message: 'Internal server error, Zubairu will fix it',
            error: error
        })
        return;
    }
}

export const decryptData = async (req: Request, res: Response, next: NextFunction) => {
    const { cardNumber, cvv, expiryDate, phoneNumber, dateOfBirth } = req.body;
    try {
        const decryptedCVV = cvv && encryptLib.decrypt(cvv, configData.appKey.cvvKey as string);
        const decryptedCardNumber = cardNumber && encryptLib.decrypt(cardNumber, configData.appKey.cardKey as string);
        const decryptedExpiryDate = expiryDate && encryptLib.decrypt(expiryDate, configData.appKey.key as string);
        const decryptedPhoneNumber = phoneNumber && encryptLib.decrypt(phoneNumber, configData.appKey.key as string);
        const decryptedDateOfBirth = dateOfBirth && encryptLib.decrypt(dateOfBirth, configData.appKey.key as string);

        const decry = {
            cardNumber: decryptedCardNumber,
            cvv: decryptedCVV,
            expiryDate: decryptedExpiryDate,
            phoneNumber: decryptedPhoneNumber,
            dateOfBirth: decryptedDateOfBirth
        };

        res.status(200).json({
            success: true,
            message: "Zubairu has granted you access to sensetive data, please keep it safe and don't be like Unoka.",
            dacryptedData: decry
        })
    } catch (error) {
        res.status(400).json({ 
            success: false,
            message: "Invalid encrypted data",
        });
    }
}