import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import configs from "./config/configs.js";
import { fakerES as faker } from '@faker-js/faker';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const __mainDirname = path.join(__dirname, '..',) 


const generateToken = (user) => {
    const token = jwt.sign({ user }, configs.privateKeyJwt, { expiresIn: '24h' })
    return token;
};

const authorization = (role) => {
    return async (req, res, next) => {
        if (req.user.role !== role) return res.status(403).send({status: 'error', message: 'No tienes permisos'});
        next();
    }
} 

const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (plainPassword, hashedPassword) =>
    bcrypt.compareSync(plainPassword, hashedPassword);


const randomProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.number.int(),
        price: faker.commerce.price(), 
        stock: faker.number.int({ max: 100 }),
        category: faker.commerce.department(),
    }
};

const generateProducts = () => {
    const numberOfProducts = faker.number.int({ min: 1, max: 2 });

    let randromProducts = [];

    for(let i=0; i < numberOfProducts; i++) {
        randromProducts.push(randomProduct());
    }

    return randromProducts;
};

export {
    generateToken,
    authorization,
    createHash,
    isValidPassword,
    __dirname,
    generateProducts,
    __mainDirname
};
