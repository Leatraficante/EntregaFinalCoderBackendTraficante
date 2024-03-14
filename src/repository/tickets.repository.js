import TicketsDao from '../dao/DBManager/classes/tickets.dao.js'

export default class TicketRepository {
    constructor(dao) {
        this.dao = new TicketsDao();
    }

    save = async (ticket) => {
        const result = await this.dao.save(ticket);
        return result;
    };

    getAll = async () => {
        const result = await this.dao.getAll();
        return result;
    };

    getById = async (ticketId) => {
        const result = await this.dao.getById(ticketId);
        return result;
    };

    getByUserEmail = async (userEmail) => {
        const result = await this.dao.getByUserEmail(userEmail);
        return result;
    };
};