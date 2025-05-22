import { Router } from 'express';
import { validate } from '../middlewares/authMiddleware';
import { schema } from '../middlewares/joiSchema'
import { listAccounts, decryptData } from '../controllers/accController';



const router = Router()

/**
 * @desc Get all created accounts with encrypted and decrypted sensitive fields
 * @route GET /api/v2/accounts
 * @access Public 
 */
router.get('/accounts', listAccounts)

/**
 * @desc Decrypt sensitive account data sent in request body
 * @route POST /api/v2/decrypt
 * @access Public 
 */
router.post('/decrypt', validate(schema.decryptDataSchema), decryptData);


export default router