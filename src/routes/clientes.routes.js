import { Router } from "express";
import { methods as clientesController } from "./../controllers/clientes";

const router = Router();

router.get("/api/clientes", clientesController.getClientes);
router.get("/api/clientes/:id", clientesController.getCliente);
router.post("/api/clientes", clientesController.addCliente);
router.delete("/api/clientes/:id", clientesController.delCliente);
router.put("/api/clientes/:id", clientesController.updateCliente);

export default router;
