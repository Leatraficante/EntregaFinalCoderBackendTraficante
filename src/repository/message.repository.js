import MessagesDao from '../dao/DBManager/classes/messages.dao.js'

export default class MessagesRepository {
    constructor(dao) {
        this.dao = new MessagesDao();
    }

    getAll = async () => {
        const result = await this.dao.getAll();
        return result;
    };

    createNewMessage = async (user, message) => {
        let mensajeGuardado = this.dao.save();
        return mensajeGuardado;
    };
}
