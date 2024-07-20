import { Router } from "express";
import { methods as categoryController } from "./../controllers/categoria";
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get("/api/categorias", authMiddleware, categoryController.getCategorias);
router.get("/api/categoria/:id", authMiddleware, categoryController.getCategoria);
router.post("/api/categoria/add", authMiddleware, categoryController.addCategoria);
router.put("/api/categoria/update/:id", authMiddleware, categoryController.updateCategoria);
router.delete("/api/categoria/delete/:id", authMiddleware, categoryController.delCategoria);

export default router;
