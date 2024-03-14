import { v4 as uuidv4 } from 'uuid';

export default class Products {
  constructor() {
    this.data = [];
    console.log('Trabajando con Productos en memoria')
  }

  getAll = async () => {
    return this.data;
  };

  save = async (product) => {
    product._id = uuidv4();
    this.data.push(product);
    return product;
  };

  update = async (id, product) => {
    const index = this.data.findIndex(p => p._id === id);
    this.data[index] = product;
    return product;
  };

  delete = async (id) => {
    const index = this.data.findIndex(p => p._id === id);
    this.data.splice(index, 1);
    return { id };

  };

  getById = async (id) => {
    const product = this.data.find(p => p._id === id);
    return product;
  }
};