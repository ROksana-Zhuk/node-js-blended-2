import createHttpError from 'http-errors';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct} from '../services/products.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getProductsController = async (req, res, next) => {
        const {category, maxPrice, minPrice} = parseFilterParams(req.query);

        const userId = req.user._id;

        const products = await getAllProducts({userId, category, maxPrice, minPrice});

        res.json({
          status: 200,
          message: 'Successfully found products!',
          data: products,
        });

  };

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user._id;
  const product = await getProductById(productId, userId);


  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {

    console.log('AAAAAAAAAAAAAAA', req.user);


    const userId = req.user._id;
    console.log('req.user._id', req.user._id);

    req.body.userId = userId;

    const product = await createProduct(req.body);

    res.status(201).json({
      status: 201,
      message: `Successfully created a product!`,
      data: product,
    });
};

export const deleteProductController = async (req, res, next) => {
    const { productId } = req.params;

    const userId = req.user._id;

    const product = await deleteProduct(productId, userId);

    if (!product) {
      throw createHttpError(404, 'Product not found');
    }

    res.status(204).send();
};

export const upsertProductController = async (req, res, next) => {
    const { productId } = req.params;

    const userId = req.user._id;

    const result = await updateProduct(productId, userId, req.body, {
      upsert: true,
    });

    if (!result) {
      throw createHttpError(404, 'Product not found');
    }

    const status = result.isNew ? 201 : 200;

    res.status(status).json({
      status,
      message: `Successfully upserted a product!`,
      data: result.product,
    });
};

export const patchProductController = async (req, res, next) => {
    const { productId } = req.params;

    const userId = req.user._id;
    const result = await updateProduct(productId,userId, req.body);

    if (!result) {
      throw createHttpError(404, 'Product not found');

    }

    res.json({
      status: 200,
      message: `Successfully patched a product!`,
      data: result.product,
    });
};
