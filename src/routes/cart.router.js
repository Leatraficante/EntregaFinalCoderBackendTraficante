import Router from "../routes/router.js";
import { accessRolesEnum, passportStrategiesEnum } from "../config/enums.js";
import { getAll, saveCart, getById, addProductToCart, deleteProductFromCart, deleteCart, purchase } from '../controller/cart.controller.js'


export default class CartRouter extends Router {
  constructor() {
    super();
  }

  init() {
    this.get('/', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, getAll);
    this.post('/', [accessRolesEnum.USER, accessRolesEnum.ADMIN, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, saveCart);
    this.get('/:cid', [accessRolesEnum.USER], passportStrategiesEnum.JWT, getById);
    this.post('/:cid/product/:pid', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, addProductToCart);
    this.delete('/:cid/product/:pid', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, deleteProductFromCart);
    this.delete('/:cid', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, deleteCart);
    this.get('/purchase/:cid', [accessRolesEnum.USER, accessRolesEnum.PREMIUM_USER], passportStrategiesEnum.JWT, purchase);
  };
};

