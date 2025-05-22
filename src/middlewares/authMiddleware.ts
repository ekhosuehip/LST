import { ObjectSchema } from 'joi'
import { Request, Response, NextFunction} from 'express';


// middleware for validating request body
export const validate = <T>(schema: ObjectSchema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (error) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                details: error.details.map(detail => detail.message)
            });
            return;
        }

        req.body = value; 
        next();
    };
} 

