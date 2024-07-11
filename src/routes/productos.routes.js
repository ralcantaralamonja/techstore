import { Router } from "express"
import { methods as productosController } from "./../controllers/productos"

const router = Router()

router.get("/api/productos", productosController.getProductos)
router.get("/api/productos/:id", productosController.getProducto)
router.post("/api/productos", productosController.addProducto)
router.delete("/api/productos/:id", productosController.delProducto)
router.put("/api/productos/:id", productosController.updateProducto)

export default router