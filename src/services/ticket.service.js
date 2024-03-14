import { v4 as uuidv4 } from 'uuid';
import TicketRepository from '../repository/tickets.repository.js';

const ticketRepository = new TicketRepository();

const generatePurchase = async (user, amount) => {
    const newTicket = {
        code: uuidv4(),
        purchase_datetime: new Date().toLocaleString(),
        amount,
        purchaser: user.email
    }

    await ticketRepository.save(newTicket);

    return newTicket;
};

const getAll = async (req, re) => {
    const tickets = await ticketRepository.getAll();
    return tickets;
};

const getById = async (ticketId) => {
    const ticket = await ticketRepository.getById(ticketId);
    return ticket;
};

const getByUserEmail = async (userEmail) => {
    const ticket = await ticketRepository.getByUserEmail(userEmail);
    return ticket
}

export {
    generatePurchase,
    getAll,
    getById,
    getByUserEmail
}