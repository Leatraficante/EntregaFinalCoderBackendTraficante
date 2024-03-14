import ProductsRepository from '../repository/products.repository.js';
import ProductDto from '../DTOs/products.dto.js';
import Products from '../dao/factory.js';
import { premiumUserDeletedProduct } from '../utils/custom.html.js';
import { sendEmail } from "./mail.service.js";

const productsRepository = new ProductsRepository(Products);

export const getAllProductsService = async () => {
  return productsRepository.getAllProducts();
};

export const getByIdProductsService = async (pid) => {
  const product = await productsRepository.getProductById(pid);
  if (product) {
    return product;
  }
};

export const saveProductService = async (productData) => {
  const productDto = new ProductDto(productData);
  const result = await productsRepository.createProduct(productDto);
  return result;
};

export const updateProductService = async (pid, productData) => {
  const productDto = new ProductDto(productData);
  await productsRepository.updateProduct(pid, productDto);
};

export const deleteProductService = async (pid) => {
  const product = await productsRepository.getProductById(pid);
  let productDetails = {
    title: product.title,
    code: product.code
  };

  if (product.owner_role === 'PREMIUM') {
    const emailDeletedPremiumProduct = {
      to: product.owner,
      subject: `Producto eliminado: ${productDetails.title}, codigo: ${productDetails.code}`,
      html: premiumUserDeletedProduct
    };

    await sendEmail(emailDeletedPremiumProduct);
  }

  await productsRepository.deleteProduct(pid);
};
