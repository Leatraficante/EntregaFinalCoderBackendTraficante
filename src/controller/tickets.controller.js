import * as ticketService from '../services/ticket.service.js'

const getAll = async (req, res) => {
    try {
        const tickets = await ticketService.getAll(req);
        res.render('user-tickets', { tickets });
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al intentar obtener todos los tickets');
    }
};

const getById = async (req, res) => {
    try {
        const ticketId = req.params.cid;
        const ticket = await ticketService.getById(ticketId);
        res.render('user-ticket-details', ticket);
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al intentar obtener el detalle de la compra');
    }
};

const getByUserEmail = async (req, res) => {
    try {
        const user = req.user;
        const userEmail = req.user.email
        const tickets = await ticketService.getByUserEmail(userEmail);
        res.render('user-tickets', { tickets, user });
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError('Error al intentar obtener los tickets del usuario');
    }
};

export {
    getAll,
    getById,
    getByUserEmail
};
