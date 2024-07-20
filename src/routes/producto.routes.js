import { Router } from 'express';
import { methods as productController } from './../controllers/producto';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get('/api/productos', authMiddleware, productController.getProductos);
router.get('/api/producto/:id', authMiddleware, productController.getProducto);
router.post('/api/producto/add', authMiddleware, productController.addProducto);
router.put('/api/producto/update/:id', authMiddleware, productController.updateProducto);
router.delete('/api/producto/delete/:id', authMiddleware, productController.delProducto);

export default router;
