import { productsModel } from '../models/products.model.js';

export default class ProductsDao {
  constructor() {
    console.log('BD Productos on')
  }

  getAll = async () => {
    const products = await productsModel.find().lean();
    return products;
  };

  save = async (product) => {
    const result = await productsModel.create(product);
    return result;
  };

  update = async (id, product) => {
    const result = await productsModel.updateOne({ _id: id }, product);
    return result;
  };

  delete = async (id) => {
    const result = await productsModel.deleteOne({ _id: id });
    return result;
  };

  getById = async (id) => {
    const result = await productsModel.findById(id).lean();
    return result;
  }
};

