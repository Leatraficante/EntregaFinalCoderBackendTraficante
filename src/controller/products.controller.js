import * as productService from '../services/products.service.js';

const getAll = async (req, res) => {
    try {
        const products = await productService.getAllProductsService();
        res.sendSuccess(products);
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError(error.message);
    }
};

const getById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productService.getByIdProductsService(pid);
        if (product) {
            res.sendSuccess(product);
        } else {
            res.sendNotFound({ error: "Producto no encontrado" });
        }
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError(error.message);
    }
};

const saveProduct = async (req, res) => {
    try {
        const { title, description, code, price, stock, category } = req.body;
        if (!title || !description || !code || !price || !stock || !category) {
            return res.sendClientError({ status: "error", error: "Valores incompletos" })
        }

        const owner = req.user.email;
        const owner_role = req.user.role;
        const productData = { title, description, code, price, stock, category, owner, owner_role };
        const result = await productService.saveProductService(productData);
        res.sendSuccessNewResults(result);

    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError(error.message);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const result = await productService.updateProductService(pid, productData);
        res.sendSuccessNewResults(result);
    } catch (error) {
        req.logger.error(error.message);
        res.sendServerError(error.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productService.getByIdProductsService(pid);

        if (!product) {
            return res.sendNotFound({ error: "Producto no encontrado" });
        }

        if (req.user.role === 'ADMIN') {
            await productService.deleteProductService(pid);
            return res.sendSuccess(`Producto eliminado por Admin`);
        }

        if (req.user.role === 'PREMIUM' && req.user.email === product.owner) {
            await productService.deleteProductService(pid);
            return res.sendSuccess(`Producto eliminado por Owner`);
        }

        return res.sendForbidden({ error: 'No tiene autorización para eliminar este producto' });
    } catch (error) {
        req.logger.error(error.message);
        return res.sendClientError({ error: "Internal Server Error" });
    }
};


export {
    getAll,
    getById,
    saveProduct,
    updateProduct,
    deleteProduct,
};