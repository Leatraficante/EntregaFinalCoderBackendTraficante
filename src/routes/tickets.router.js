import Router from "../routes/router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, getByUserEmail } from '../controller/tickets.controller.js';

export default class TicketRouter extends Router {
    constructor() {
        super();
    }

    init() {
        this.get('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, getAll);
        this.get('/user-tickets', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, getByUserEmail);
        this.get('/:cid', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, getById);
    }
}
