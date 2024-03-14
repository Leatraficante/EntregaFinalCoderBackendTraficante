import UsersDao from '../dao/DBManager/classes/users.dao.js';

export default class UsersRepository {
    constructor() {
        this.dao = new UsersDao();
    }

    getAll = async() => {
        const result = await this.dao.getAll();
        return result;
    }

    getByEmail = async (email) => {
        const result = await this.dao.getByEmail(email);
        return result;
    }

    save = async (user) => {
        const result = await this.dao.save(user);
        return result;
    }

    getById = async (id) => {
        const result = await this.dao.getById(id)
        return result;
    };

    getByRoles = async (roles) => {
        const result = await this.dao.getbyRoles(roles)
        return result;
    }


};