import { ProductsCollection } from '../db/models/Product.js';

export const getAllProducts = async ({userId, category, minPrice, maxPrice}) => {


  console.log('maxPrice', maxPrice);

  const productQuery = ProductsCollection.find();

  productQuery.where('userId').equals(userId);


  if(category) {
    productQuery.where('category').equals(category);
  }

  if(minPrice) {
    productQuery.where('price').gte(minPrice);
  }

  if(maxPrice) {
    productQuery.where('price').lte(maxPrice);
  }
  return productQuery;
};

export const getProductById = async (productId, userId) => {

  const product = await ProductsCollection.findOne({
    _id: productId,
    userId: userId
  });
  return product;
};

export const createProduct = async (payload) => {
    const product = await ProductsCollection.create(payload);
    return product;
  };


export const deleteProduct = async (productId, userId) => {
    const product = await ProductsCollection.findOneAndDelete({
      _id: productId,
      userId: userId
    });

    return product;
};


export const updateProduct = async (productId, userId, payload, options = {}) => {
    const rawResult = await ProductsCollection.findOneAndUpdate(
      {
        _id: productId,
        userId: userId,
      },
      payload,
      {
        new: true,
        includeResultMetadata: true,
        ...options,
      },
    );

    if (!rawResult || !rawResult.value) return null;

    return {
      product: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};
