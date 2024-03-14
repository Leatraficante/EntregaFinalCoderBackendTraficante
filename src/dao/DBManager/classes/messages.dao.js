import { messageModel } from '../models/messages.model.js'

export default class MessagesDao {
  constructor() {
    console.log('BD Mensajes on');
  }

  getAll = async () => {
    const messages = await messageModel.find().lean();
    return messages;
  };

  createNewMessage = async (user, message) => {
    let nuevoMensaje = new messageModel({
      user,
      message,
    });

    try {
      let mensajeGuardado = await nuevoMensaje.save();
      return mensajeGuardado;
    } catch (err) {
      console.error('Error al guardar el mensaje:', err);
      throw err;
    }
  };
}
