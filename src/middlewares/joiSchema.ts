import Joi from "joi";

//firstName, surname, email, phoneNumber, dateOfBirt
export const schema = {
    singUp: Joi.object({
        firstName: Joi.string().min(2).max(100).required().messages({
            'string.empty': 'Firstname is required.',
            'string.min': 'Firstname must be at least 2 characters.',
            'string.max': 'Firstname must not exceed 100 characters.',
            }),
        surname: Joi.string().min(2).max(100).required().messages({
            'string.empty': 'surname is required.',
            'string.min': 'surname must be at least 2 characters.',
            'string.max': 'surname must not exceed 100 characters.',
            }),
        phoneNumber: Joi.string()
            .pattern(/^(234[0-9]{9,10}|0[0-9]{10}|[0-9]{10})$/)
            .required()
            .messages({
            'string.pattern.base': 'Phone number must be in the format 234XXXXXXXXX (10 digits), 234XXXXXXXXXX (11 digits), 0XXXXXXXXX (10 digits), or 10 digits long',
            'string.empty': 'Phone number is required',
            }),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: false } }) // tlds open (no restriction)
            .required()
            .messages({
                'string.email': 'Please provide a valid email address.',
                'string.empty': 'Email is required.',
            }),
        dateOfBirth: Joi.date()
            .iso()
            .required()
            .messages({
                'date.base': 'Date of birth must be a valid date.',
                'any.required': 'Date of birth is required.',
            })
    }),
    decryptDataSchema: Joi.object({
        cardNumber: Joi.string()
            .pattern(/^[\w:/.-]+$/)
            .min(33 + 64) // 32-char IV + colon + 64-char ciphertext
            .max(97)      // Total expected length
            .optional(),

        cvv: Joi.string()
            .pattern(/^[\w:/.-]+$/)
            .min(33 + 32)
            .max(65)
            .optional(),

        expiryDate: Joi.string()
            .pattern(/^[\w:/.-]+$/)
            .min(33 + 32)
            .max(65)
            .optional(),

        phoneNumber: Joi.string()
            .pattern(/^[\w:/.-]+$/)
            .min(33 + 64)
            .max(97)
            .optional(),

        dateOfBirth: Joi.string()
            .pattern(/^[\w:/.-]+$/)
            .min(33 + 64)
            .max(97)
            .optional()
        })
}