import { Router } from 'express';

import {
  getProductsController,
  getProductByIdController,
  createProductController,
  deleteProductController,
  upsertProductController,
  patchProductController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createProductSchema, updateProductSchema } from '../validation/products.js';
import { validateId } from '../middlewares/validateId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.use(authenticate);


router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', validateId, ctrlWrapper(getProductByIdController));

router.post('/', validateBody(createProductSchema), ctrlWrapper(createProductController));

router.delete('/:productId', validateId, ctrlWrapper(deleteProductController));

router.put(
    '/:productId',
    validateId,
    validateBody(createProductSchema),
    ctrlWrapper(upsertProductController),
  );

router.patch('/:productId', validateId, validateBody(updateProductSchema), ctrlWrapper(patchProductController));


router.get('/', ctrlWrapper(getProductsController));

export default router;

