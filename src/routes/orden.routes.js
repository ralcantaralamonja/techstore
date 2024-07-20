import { Router } from "express";
import { methods as orderController } from "./../controllers/orden";
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get("/api/ordenes", authMiddleware, orderController.getOrdenes);
router.post("/api/orden/add", authMiddleware, orderController.addOrden);
router.get("/api/orden/:id", authMiddleware, orderController.getOrden);
router.put("/api/orden/update/:id", authMiddleware, orderController.updateOrden);
router.delete("/api/orden/delete/:id", authMiddleware, orderController.delOrden);

export default router;
