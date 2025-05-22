import { Router } from "express";
import { signUp} from '../controllers/authController';
import { validate } from "../middlewares/authMiddleware";
import { schema } from "../middlewares/joiSchema";

const router = Router();

/**
 * @desc Register a new user and create a bank account
 * @route POST /api/v1/signup
 * @access Public
 * @body {
 *   firstName: string,
 *   surname: string,
 *   email: string,
 *   phoneNumber: string (encrypted),
 *   dateOfBirth: string (encrypted)
 * }
 * @returns {
 *   success: boolean,
 *   message: string,
 *   accountData: object
 * }
 */
router.post('/signup',validate(schema.singUp), signUp)


export default router