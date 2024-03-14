import * as messagesService from '../services/messages.service.js'

const getAll = async (req, res) => {
    const messages = await messagesService.getAllMessagesService();
    res.sendSuccess(messages);
};

const createNewMessage = async (req, res) => {
    const { user, message } = req.body;
    try {
        const nuevoMensaje = await messagesService.createNewMessageService(user, message);
        res.sendSuccess({ status: 'success', message: 'Mensaje creado', data: nuevoMensaje });
    } catch (error) {
        res.sendServerError({ status: 'error', message: error.message });
    }
};

export {
    getAll,
    createNewMessage
};