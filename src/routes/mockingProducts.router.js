import Router from 'express';
import { generateProducts } from '../utils.js';

const mockingProductsRouter = Router();

mockingProductsRouter.get('/', (req, res) => {
    let mockingProducts = [];

    for(let i=0; i < 100; i++) {
        mockingProducts.push(generateProducts());
    }

    res.send({
        status: 'ok',
        counter: mockingProducts.length,
        data: mockingProducts
    });
});

export default mockingProductsRouter;