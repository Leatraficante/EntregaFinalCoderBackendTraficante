import * as usersService from "../services/users.service.js";
import { InvalidCredentials, UserAlreadyExists } from "../utils/custom.exceptions.js";
import usersModel from "../dao/DBManager/models/users.model.js";

const register = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, role } = req.body;

        if (!first_name || !last_name || !email || !age || !password || !role) {
            return res.sendClientError('Valores incompletos')
        }

        const result = await usersService.registerService({ ...req.body })

        res.sendSuccessNewResults(result);

    } catch (error) {
        req.logger.error(error.message);
        if (error instanceof UserAlreadyExists) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendClientError('Valores incompletos')
        }

        const result = await usersService.loginService(email, password);

        res.cookie('coderCookieToken', result.access_token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
            .send({ status: 'success', message: 'Login realizdo con éxito' });

    } catch (error) {
        req.logger.error(error.message);
        if (error instanceof InvalidCredentials) {
            return res.sendClientError(error.message);
        }
        res.sendServerError(error.message);
    }
};


const logout = async (req, res) => {
    try {
        await usersService.logoutService();
        res.clearCookie('coderCookieToken');
        res.redirect("/login");
    } catch (error) {
        req.logger.error(error.message);
        res.sendClientError({ status: 'error', message: error.message })
    }
};

const test = async (req, res) => {
    res.sendSuccess(accessToken);
};

const uploadDocuments = async (req, res) => {
    try {
        const userId = req.params.uid;
        const files = req.files;

        if (!files || files.length === 0) {
            return res.sendClientError({ error: 'No se han enviado archivos' });
        }

        const user = await usersModel.findById(userId);

        const filenames = files.map(file => file.filename);

        user.documents = filenames;

        await user.save();

        res.sendSuccess({ message: 'Documentos subidos correctamente' });
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al subir documentos');
    }
};

const userToPremium = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await usersModel.findById(userId);

        if (!user) {
            return sendClientError(res, 'Usuario no encontrado');
        }

        if (user.role === 'PREMIUM') {
            return res.sendClientError('El usuario ya es PREMIUM');
        } else if (user.documents.some(doc => doc.includes('identification')) &&
            user.documents.some(doc => doc.includes('address')) &&
            user.documents.some(doc => doc.includes('account-status'))) {
            user.role = 'PREMIUM';
            await user.save();
            return res.sendSuccess({ message: 'Rol de usuario cambiado a premium exitosamente' });
        } else {
            return res.sendClientError({ message: 'El usuario debe cargar todos los documentos requeridos' });
        }


    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al intentar cambiar el usuario a premium');
    }
};

const allUsers = async (req, res) => {
    try {
        const users = await usersService.getAll(req);
        res.render('users', { users })
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al intentar obtener todos los usuarios');
    }
};

const deleteInactive = async (req, res) => {
    try {
        const inactiveTime = 2 * 60 * 60 * 1000; // DD * HH * MM * SS * MS        
        const { deletedUsersEmails, deletedUsers } = await usersService.deleteInactiveUsers(inactiveTime);
        return res.sendSuccess({ message: 'Usuarios inactivos eliminados correctamente.', deletedUsersEmails });
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al intentar eliminar los usuarios inactivos');
    }
};

const deleteById = async (req, res) => {
    try {
        const userId = req.params.uid;
        const userTodelete = await usersService.deleteByIdService(userId)
        if (!userTodelete) {
            return res.sendNotFound('Usuario no encontrado.');
        }
        return res.sendSuccess({ message: 'Usuario eliminado correctamente.', userTodelete });
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al intentar eliminar el usuario');
    }
}

export {
    login,
    register,
    logout,
    test,
    uploadDocuments,
    userToPremium,
    allUsers,
    deleteInactive,
    deleteById
};