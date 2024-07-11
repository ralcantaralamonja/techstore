import { Router } from "express";
import { methods as ordenesController } from "./../controllers/ordenes";

const router = Router();

router.get("/api/ordenes", ordenesController.getOrdenes);
router.get("/api/ordenes/:id", ordenesController.getOrden);
router.post("/api/ordenes", ordenesController.addOrden);
router.delete("/api/ordenes/:id", ordenesController.delOrden);
router.put("/api/ordenes/:id", ordenesController.updateOrden);

export default router;
