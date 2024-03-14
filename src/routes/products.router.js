import Router from "../routes/router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, getById, saveProduct, updateProduct, deleteProduct } from '../controller/products.controller.js'

export default class ProductRouter extends Router {
  constructor() {
    super();
  }

  init() {
    this.get('/', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, getAll);
    this.get('/:pid', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER, accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, getById);
    this.post('/', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, saveProduct);
    this.put('/:pid', [accessRolesEnum.ADMIN], passportStrategiesEnum.JWT, updateProduct);
    this.delete('/:pid', [accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, deleteProduct);
};
};

