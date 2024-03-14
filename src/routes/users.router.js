import Router from "../routes/router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { login, register, logout, uploadDocuments, userToPremium, allUsers, deleteInactive, deleteById } from "../controller/users.controller.js";
import { upload } from "../middleware/multer.config.js";

export default class UsersRouter extends Router {
    constructor() {
        super();
    }

    init() {
        this.post('/login', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, login);
        this.post('/register', [accessRolesEnum.PUBLIC], passportStrategiesEnum.NOTHING, register);
        this.post('/logout', [accessRolesEnum.USER, accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, logout);
        this.post('/:uid/documents', [accessRolesEnum.USER, accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, upload.any(), uploadDocuments);
        this.put('/premium/:uid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, userToPremium);
        this.get('/', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, allUsers);
        this.delete('/delete-inactive', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, deleteInactive)
        this.delete('/delete/:uid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, deleteById )
    };
};
