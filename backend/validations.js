import { body } from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 7 символов').isLength({ min: 7 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 7 символов').isLength({ min: 7 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('phone','Неверный формат номера телефона').isMobilePhone(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок заказа').isLength({ min: 5 }),
    body('description', 'Введите описание заказа').isLength({ min: 5 }),
    body('costFrom', 'Введите стоимость заказа (от какой суммы)').isLength({ min: 1 }),
    body('costTo','Введите стоимость заказа (до какой суммы)').optional().isLength({ min: 1 }),
    body('leadTime','Введите сроки для заказа').isLength({ min: 4 }),
    body('location','Введите местоположение').optional().isLength({ min: 4 }),
    body('tags','Неверный формат тэгов').optional().isArray(),
];
