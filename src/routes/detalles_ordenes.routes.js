import { Router } from "express";
import { methods as DOController } from "./../controllers/detalles_ordenes"

const router = Router();

// Rutas para gestionar detalles de órdenes
router.post("/api/detalles_ordenes", DOController.addDetalleOrden);
router.get("/api/detalles_ordenes/:orden_id", DOController.getDetallesOrden);
router.get("/api/detalles_ordenes", DOController.getOrdens);
router.put("/api/detalles_ordenes/:id", DOController.updateDetalleOrden);
router.delete("/api/detalles_ordenes/:id", DOController.deleteDetalleOrden);

export default router;
