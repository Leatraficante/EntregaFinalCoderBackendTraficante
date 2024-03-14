import MessagesRepository from '../repository/message.repository.js'

const messagesRepository = new MessagesRepository();


const getAllMessagesService = async () => {
    return messagesRepository.getAll();
};

const createNewMessageService = async (user, message) => {
    return messagesRepository.createNewMessage(user, message);
};

export {
    getAllMessagesService,
    createNewMessageService
};