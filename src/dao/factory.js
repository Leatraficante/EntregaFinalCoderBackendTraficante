import config from '../config/configs.js';

const persistence = config.persistence;

let Products;

switch (persistence) {
    case 'MONGO':
        console.log('Trabajando con persistencia en MongoDB');
        const mongoose = await import('mongoose');
        await mongoose.connect(config.mongoUrl);
        const { default: ProductsDB } = await import('./DBManager/ProductManager.js');
        Products = ProductsDB;
        break;
    case 'MEMORY':
        console.log('Trabajando con persistencia en memoria');
        const { default: ProductsMemory } = await import('./FileManager/productManager.memory.js');
        Products = ProductsMemory;

        break;

};

export default Products;