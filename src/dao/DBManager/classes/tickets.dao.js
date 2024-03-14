import ticketModel from "../models/tickets.model.js";

export default class TicketDao {
  constructor() {
    console.log('BD Tickets on')
  };
  
    save = async (ticket) => {
        return await ticketModel.create(ticket);
      };

    getAll = async () => {
      return await ticketModel.find();
    };

    getById = async (ticketId) => {
      return await ticketModel.findById(ticketId);
    };

    getByUserEmail = async (userEmail) => {
      try {
        const result = await ticketModel.find({ purchaser: userEmail });
        return result;
      } catch (error) {
        console.error('Error al buscar tickets por correo electrónico:', error);
        throw error;
      }
    };
    
};