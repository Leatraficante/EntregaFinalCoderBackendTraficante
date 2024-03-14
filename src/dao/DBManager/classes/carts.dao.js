import { cartModel } from '../models/cart.model.js';
import usersModel from '../models/users.model.js'
import { productsModel } from '../models/products.model.js'

export default class CartsDao {
  constructor() {
    console.log('BD Carts on')
  }

  getAll = async () => {
    const carts = await cartModel.find().lean();
    return carts;
  };

  save = async (userId) => {
    const user = await usersModel.findOne({ _id: userId }).lean();
    const cart = await cartModel.create({ user: user._id });
    await usersModel.findByIdAndUpdate(user._id, { cart: { cartId: cart._id } });
    return cart;
  };

  delete = async (cid) => {
    const result = await cartModel.deleteOne({ _id: cid });
    return result;
  };

  getById = async (id) => {
    const result = await cartModel.findById(id).lean();
    return result;
  };

  
  addProductToCart = async (cartId, productId, quantity, price) => {
    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return { error: "Carrito no encontrado" };
    }

    const existingProductIndex = cart.products.findIndex(product => String(product.productId) === String(productId));

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += parseInt(quantity);
      cart.products[existingProductIndex].price = cart.products[existingProductIndex].quantity * price;
    } else {
      const productDetails = await productsModel.findById(productId);

      if (!productDetails) {
        return { error: "Producto no encontrado" };
      }

      const parsedQuantity = parseInt(quantity);

      const totalPrice = productDetails.price * parsedQuantity

      
      cart.products.push({
        productId: productDetails._id,
        quantity: parsedQuantity,
        price: totalPrice.toFixed(2)
      });
    }

    const result = await cart.save();
    return result;
};


  deleteProductFromCart = async (cartId, productId) => {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      return { error: "Carito no encontrado" };
    }

    const existsProductInCartIndex = cart.products.findIndex((product) => product._id == productId);

    if (existsProductInCartIndex !== -1) {
      cart.products.splice(existsProductInCartIndex, 1);
      const result = await cartModel.updateOne({ _id: cartId }, { $set: { products: cart.products } });
      return result;
    } else {
      return 'Producto no encontrado';
    }
  };

  updateProducts = async (cartId, products) => {
    const result = await cartModel.findByIdAndUpdate(cartId, { products }, { new: true }).lean();
    return result;
  };

  updateProductInCart = async (cartId, productId, newQuantity) => {
    const cart = await cartModel.findById(cartId);

    if (!cart) {
      return { error: "Carrito no encontrado" };
    }

    const existingProductIndex = cart.products.findIndex(product => product.productId.toString() === productId);

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity = newQuantity;
      const result = await cart.save();
      return result;
    } else {
      return { error: "Producto no encontrado en carrito" };
    }
  };

  getCartByUserId = async (userId) => {
    const result = await cartModel.findOne({ user: userId });
    return result;
  };

  emptyCart = async (cartId) => {
    const updatedCart = await cartModel.findByIdAndUpdate(cartId, { products: [] });
    return updatedCart;
  };

};