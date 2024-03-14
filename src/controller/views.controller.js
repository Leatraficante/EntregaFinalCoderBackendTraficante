import * as viewsService from '../services/views.service.js';
import * as usersService from '../services/users.service.js';
import * as cartsService from '../services/cart.service.js';
import configs from '../config/configs.js';
import jwt from 'jsonwebtoken';
import { createHash } from '../utils.js';
import { sendEmail } from '../services/mail.service.js'

const register = (req, res) => {
    res.render('register');
};

const login = (req, res) => {
    res.render('login');
};

const logout = (req, res) => {
    res.render('logout');
};

const loginRedirect = (req, res) => {
    res.redirect('/api/users/login')
};

const profile = (req, res) => {
    const user = req.user;
    res.render('profile', { user });
};

const productsView = async (req, res) => {
    try {
        const productData = await viewsService.productsViewService(req);
        res.render('products', productData)
    } catch (error) {
        req.logger.error(error.message);
    }
};

const cartsView = async (req, res) => {
    try {
        const userId = req.user._id;
        const carts = await cartsService.getCartByUserId(userId)
        const productsInCart = carts.products;
        res.render('carts', { carts, productsInCart });
    } catch (error) {
        req.logger.error(error.message);
    }
};

const messagesView = async (req, res) => {
    try {
        res.render('messages');
    } catch (error) {
        req.logger.error(error.message);
    }
};

const productId = async (req, res) => {
    const user = req.user;
    const cartId = req.user.cart.cartId;
    const productId = req.params.productId;
    try {
        const product = await viewsService.productIdService(productId);
        res.render('productDetails', { product, user, cartId });
    } catch (error) {
        req.logger.error(error.message);
    }
};

const cartId = async (req, res) => {
    const user = req.user;
    const cartId = req.params.cid;
    try {
        const cart = await viewsService.cartIdService(cartId);
        res.render('cartDetails', { cart, user, cartId });
    } catch (error) {
        req.logger.error(error.message);
    }
};

const forgotPasword = async (req, res) => {
    res.render('forgot-password')
};

const forgotPasswordVerification = async (req, res) => {
    const { email } = req.body;
    const user = await usersService.getByEmail(email);

    if (!user) {
        return res.sendNotFound({ message: 'Usuario no encontrado' });
    }

    const secret = configs.privateKeyJwt + user.password;
    const payload = {
        email: user.email,
        id: user._id
    }
    const token = jwt.sign(payload, secret, { expiresIn: '60m' });

    const emailResetPassword = {
        to: user.email,
        subject: 'Reset password',
        html: `<p>Haz clic en el siguiente enlace para restablecer la contraseña:</p>
               <a href="http://localhost:8080/api/users/reset-password/${user._id}/${token}">
                   Restablecer Contraseña
               </a>`
    };


    await sendEmail(emailResetPassword);

    console.log(emailResetPassword)
    res.send('Se ha enviado un email a la casilla de correo para restablecer la contrasña')
};


const resetPassword = async (req, res) => {
    const { id, token } = req.params;
    const user = await usersService.getById(id);

    if (!user) {
        return res.sendNotFound({ message: 'Usuario no encontrado' });
    }

    if (id !== user._id.toString()) {
        return res.sendNotFound({ message: 'ID incorrecto' });
    }

    const secret = configs.privateKeyJwt + user.password;
    try {
        const payload = jwt.verify(token, secret)
        res.render('reset-password', { email: user.email })

    } catch (error) {
        req.logger.error(error.message);
        res.send(error.message)
    }
};

const resetPasswordConfirm = async (req, res) => {
    const { id, token } = req.params;
    const user = await usersService.getById(id);

    const { password1, password2 } = req.body;

    if (!user) {
        return res.sendNotFound({ message: 'Usuario no encontrado' });
    }

    if (id !== user._id.toString()) {
        return res.sendNotFound({ message: 'ID incorrecto' });
    }

    const secret = configs.privateKeyJwt + user.password;

    try {
        const payload = jwt.verify(token, secret);

        if (password1 !== password2) {
            return res.sendClientError({ message: 'Las contraseñas no coinciden, intente nuevamente' });
        }

        user.email = user.email;

        const hashedPassword = createHash(password1);

        user.password = hashedPassword;

        await user.save();

        res.redirect('/api/users/reset-pass-success')

    } catch (error) {
        req.logger.error(error.message);
        res.send(error.message);
    }
};

const resetPassSucces = async (req, res) => {
    try {
        res.render("reset-pass-success");
    } catch (error) {
        res.sendClientError({ status: 'error', message: error.message })
    }
};

const admin = async (req, res) => {
    try {
        const users = await usersService.getAll(req)
        res.render('admin', { users })
    } catch (error) {
        req.logger.error(error.message);
    }
};

export {
    login,
    logout,
    loginRedirect,
    register,
    profile,
    productsView,
    cartsView,
    messagesView,
    productId,
    cartId,
    forgotPasword,
    forgotPasswordVerification,
    resetPassword,
    resetPasswordConfirm,
    resetPassSucces,
    admin
};