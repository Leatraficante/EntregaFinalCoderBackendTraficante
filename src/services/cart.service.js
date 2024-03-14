import ProductsRepository from '../repository/products.repository.js';
import CartsRepository from '../repository/carts.repository.js';
import * as ticketsService from './ticket.service.js';
import { sendEmail } from "./mail.service.js";


const productsRepository = new ProductsRepository();
const cartsRepository = new CartsRepository();

const getAllCartService = async () => {
    return cartsRepository.getAllCarts();
};

const saveCartService = async (userId) => {
    return cartsRepository.createCart(userId);
};

const getByIdService = async (cartId) => {
    const cart = await cartsRepository.getCartById(cartId);
    return cart;

};

const getCartByUserId = async (userId) => {
    const cart = await cartsRepository.getCartByUserId(userId);
    return cart
}

const addProductToCartService = async (cartId, productId, quantity, price) => {
    return cartsRepository.addProductToCart(cartId, productId, quantity, price);
};

const deleteProductFromCartService = async (cid, pid) => {
    const result = await cartsRepository.deleteProductFromCart(cid, pid);
    return { message: 'Producto eliminado satisfactoriamente', deletedProduct: result };
};

const deleteCartService = async (cid) => {
    const deletedCart = await cartsRepository.deleteCart(cid);
    return `Carito ${deletedCart} eliminado satisfactoriamente`;
};

const purchaseService = async (cartId, user) => {
    const cart = await cartsRepository.getCartById(cartId)

    if (!cart) {
        throw { status: 404, message: "Carrito no encontrado" };
    }

    if (cart.products.length === 0) {
        throw { status: 400, message: 'El carrito esta vacío, agregue productos antes de continuar' }
    }

    for (const product of cart.products) {
        const productId = product.productId;
        const productDetails = await productsRepository.getProductById(productId);
        if (productDetails.stock < product.quantity) {
            throw { status: 400, message: `El stock no es suficiente para continuar con la compra: ${productDetails.title}` };
        }
    }

    let totalAmount = 0;
    for (const product of cart.products) {
        const productId = product.productId;
        const productDetails = await productsRepository.getProductById(productId);
        totalAmount += productDetails.price * product.quantity;
    }

    totalAmount = parseFloat(totalAmount.toFixed(2));

    const ticket = await ticketsService.generatePurchase(user, totalAmount);

    for (const product of cart.products) {
        const productId = product.productId;
        const productDetails = await productsRepository.getProductById(productId);
        await productsRepository.updateProduct(productId, { stock: productDetails.stock - product.quantity });
    }

    await cartsRepository.emptyCart(cartId);

    const emailPurchaseSuccess = {
        to: ticket.purchaser,
        subject: `Compra realizada con éxito`,
        html: `Estimado cliente:<br>
        Nos complace confirmar que tu pedido ha sido procesado con éxito.<br>
        
        Detalles de la compra:<br>

        Codigo: <strong>${ticket.code}</strong><br>
        Fecha: <strong>${ticket.purchase_datetime}</strong><br>
        Total: <strong>$${ticket.amount}</strong><br>

        ¡Gracias por elegirnos y esperamos que disfrutes de tu compra!
        `
    };

    await sendEmail(emailPurchaseSuccess);

    return { message: 'Compra finalizada exitosamente', payload: ticket };
};



export {
    getAllCartService,
    saveCartService,
    getByIdService,
    getCartByUserId,
    addProductToCartService,
    deleteProductFromCartService,
    deleteCartService,
    purchaseService,
};
