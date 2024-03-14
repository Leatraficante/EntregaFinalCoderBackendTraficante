import { createHash, generateToken, isValidPassword } from "../utils.js";
import UsersRepository from '../repository/users.repository.js';
import { InvalidCredentials, UserAlreadyExists } from "../utils/custom.exceptions.js";
import { loginInvalidCredentials, userDeletedMessage } from "../utils/custom.html.js";
import { sendEmail } from "./mail.service.js";
import usersModel from "../dao/DBManager/models/users.model.js";
import * as cartService from '../services/cart.service.js'

const usersRepository = new UsersRepository();

const getAll = async () => {
    return usersRepository.getAll();
}

const getByEmail = async (email) => {
    const user = await usersRepository.getByEmail(email);
    if (!user) {
        throw new InvalidCredentials('Usuario no encontrado');
    }
    return user;
};

const getById = async (id) => {
    const user = await usersRepository.getById(id);
    if (!user) {
        throw new InvalidCredentials('Usuario no encontrado');
    }
    return user;

};

const loginService = async (email, password) => {

    const user = await usersRepository.getByEmail(email);

    if (!user) {
        throw new InvalidCredentials('Los datos ingresados no son correctos');
    }

    const comparePassword = isValidPassword(password, user.password);

    if (!comparePassword) {
        const emailInvalidCredentials = {
            to: user.email,
            subject: 'Login fallido',
            html: loginInvalidCredentials
        };

        await sendEmail(emailInvalidCredentials);

        throw new InvalidCredentials('Los datos ingresados no son correctos');
    }

    const { password: _, ...userResult } = user;
    const accessToken = generateToken(userResult);

    return { status: 'success', message: 'Login successful', access_token: accessToken };
};



const registerService = async (user) => {

    const userByEmail = await usersRepository.getByEmail(user.email);

    if (userByEmail) {
        throw new UserAlreadyExists('El usuario ya existe')
    }

    const hashedPassword = createHash(user.password);

    const newUser = {
        ...user
    }

    newUser.password = hashedPassword;

    const result = await usersRepository.save(newUser);
    
    await cartService.saveCartService(result._id)

    return { status: 'success', data: result };
};


const logoutService = async () => {
    return { status: 'success', message: 'Logout realizado satisfactoriamente.' }
};

const deleteInactiveUsers = async (inactiveTime) => {
    const limitDate = new Date(Date.now() - inactiveTime);
    const usersToDelete = await usersModel.find({ role: { $in: ['USER', 'PREMIUM'] }, last_connection: { $lt: limitDate } });

    const deletedUsersEmails = usersToDelete.map(user => user.email);

    for (const email of deletedUsersEmails) {
        const emailDeletedAccount = {
            to: email,
            subject: 'Su cuenta ha sido eliminada',
            html: userDeletedMessage
        };

        await sendEmail(emailDeletedAccount);
    }

    const deletedUsers = await usersModel.deleteMany({ role: { $in: ['USER', 'PREMIUM'] }, last_connection: { $lt: limitDate } });

    return { deletedUsersEmails, deletedUsers };
};

const deleteByIdService = async (uid) => {
    const userToDelete = await usersModel.findByIdAndDelete(uid);
    if (!userToDelete) {
        throw new Error('Usuario no encontrado.');
    }
    return userToDelete; 
};

const getByRoles = async (roles) => {
    const users = await usersRepository.getByRoles(roles);
    return users
}


export {
    loginService,
    registerService,
    logoutService,
    usersRepository,
    getByEmail,
    getById,
    getAll,
    deleteInactiveUsers,
    deleteByIdService,
    getByRoles
};