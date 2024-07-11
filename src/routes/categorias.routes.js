import { Router } from "express";
import { methods as categoriasController } from "../controllers/categorias";

const router = Router();

router.get("/api/categorias", categoriasController.getCategorias);
router.get("/api/categorias/:id", categoriasController.getCategoria);
router.post("/api/categorias", categoriasController.addCategoria);
router.delete("/api/categorias/:id", categoriasController.delCategoria);
router.put("/api/categorias/:id", categoriasController.updateCategoria);

export default router;
