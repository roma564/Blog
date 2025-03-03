import {body} from 'express-validator'

export const registerValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password must be more than 5 symbols').isLength({ min: 5 }),
    body('fullName', 'Full Name must be more than 3 symbols').isLength({ min: 3 }),
    body('avatarUrl', 'incorrect URL').optional().isURL()
]

export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('password', 'Password must be more than 5 symbols').isLength({ min: 5 }),
]

export const postCreateValidation = [
    body('title', 'Enter title').isLength({ min: 3 }).isString(),
    body('text', 'Enter text').isLength({ min: 10 }).isString(),
    body('tags', 'Incorrect format of tags (put the array)').optional().isString(),
    body('imageURL', 'incorrect URL of image').optional().isString()
]



