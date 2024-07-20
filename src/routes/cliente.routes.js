import { Router } from "express";
import { methods as clienteController } from "./../controllers/cliente";
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get("/api/clientes", authMiddleware, clienteController.getClientes);
router.get("/api/cliente/:id", authMiddleware, clienteController.getCliente);
router.post("/api/cliente/add", authMiddleware, clienteController.addCliente);
router.put("/api/cliente/update/:id", authMiddleware, clienteController.updateCliente);
router.delete("/api/cliente/delete/:id",authMiddleware, clienteController.delCliente);

export default router;
