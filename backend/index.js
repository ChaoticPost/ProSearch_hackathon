import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { registerValidation } from './validations/auth.js';
import { validationResult } from 'express-validator';
import UserModel from './models/User.js';

/*
ПОДКЛЮЧЕНИЕ К БАЗЕ ДАННЫХ
*/
mongoose
    .connect('mongodb+srv://admin:admin@cluster0.bmrgbts.mongodb.net/pro?retryWrites=true&w=majority')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB not OK', err));
/*
СОЗДАНИЕ ЭКСПРЕСС ПРИЛОЖЕНИЯ
*/
const app = express();
app.use(express.json());
/*
АВТОРИЗАЦИЯ
*/
app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email, phone: req.body.phone });

        if (!user) {
            return req.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

        if (!isValidPass) {
            return req.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '7d',
            }
        );

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (err) { }
});
/*
РЕГИСТРАЦИЯ
*/
app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '7d',
            });

        const { passwordHash, ...userData } = user._doc;
        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err),
            res.status(500).json({
                message: 'Не удалось зарегистрироваться',
            });
    }
});
/*
ЗАПУСК НА ПОРТЕ 4444
*/
app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
