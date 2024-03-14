import { productsModel } from '../dao/DBManager/models/products.model.js';
import ProductsRepository from '../repository/products.repository.js';
import CartsRepository from '../repository/carts.repository.js'

const productsRepository = new ProductsRepository();
const cartsRepository = new CartsRepository();

const productsViewService = async (req) => {
    const user = req.user;
    const limit = Number(req.query.limit);
    const category = req.query.category;
    const { page = 1 } = req.query;

    const allProducts = await productsRepository.getAllProducts();

    const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await productsModel.paginate({}, { limit: 7, page, lean: true });

    let products = allProducts;
    if (category) {
        products = products.filter(product => product.category === category);
    }

    if (limit !== undefined && !isNaN(limit)) {
        products = products.slice(0, limit);
    }

    return {
        user,
        products: docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage
    }

};

const cartsViewService = async (cartId) => {
    const cart = cartsRepository.getCartById(cartId)
    return cart;

};

const productIdService = async (productId) => {
    return productsRepository.getProductById(productId)
};


const cartIdService = async (cartId) => {
    return cartsRepository.getCartById(cartId)
};


export {
    productsViewService,
    cartsViewService,
    productIdService,
    cartIdService
}