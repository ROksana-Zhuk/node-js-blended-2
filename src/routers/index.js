import { Router } from 'express';
import productsRouter from './products.js';
import usersRouter from './users.js';

const router = Router();

router.use('/products', productsRouter);
router.use('/users', usersRouter);

export default router;
