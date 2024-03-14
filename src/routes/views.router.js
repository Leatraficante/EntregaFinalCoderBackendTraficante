import Router from "../routes/router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import {
    login, loginRedirect, logout, register, profile, productsView, cartsView,
    messagesView, productId, cartId, forgotPasword, forgotPasswordVerification, resetPassword,
    resetPasswordConfirm, resetPassSucces, admin
} from '../controller/views.controller.js'


export default class ViewsRouter extends Router {
    constructor() {
        super();
    }

    init() {
        this.get('/api/users/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
        this.get('/api/users/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, login);
        this.get('/api/users/logout', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, logout);
        this.get('/', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, loginRedirect);
        this.get('/profile', [accessRolesEnum.USER, accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, profile);
        this.get('/api/products', [accessRolesEnum.USER, accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, productsView);
        this.get('/api/carts', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, cartsView);
        this.get('/api/messages-view', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, messagesView);
        this.get('/api/products/:productId', [accessRolesEnum.USER, accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, productId);
        this.get('/api/carts/:cid', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, cartId);
        this.get('/api/users/forgot-password', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, forgotPasword)
        this.post('/api/users/forgot-password', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, forgotPasswordVerification)
        this.get('/api/users/reset-password/:id/:token', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, resetPassword)
        this.post('/api/users/reset-password/:id/:token', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, resetPasswordConfirm)
        this.get('/api/users/reset-pass-success', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, resetPassSucces)
        this.get('/api/users/admin', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, admin)
    };
};

