import express from "express";
import morgan from "morgan";
import cors from "cors";
import productos from "./routes/productos.routes";
import categorias from "./routes/categorias.routes";
import clientes from "./routes/clientes.routes";
import ordenes from "./routes/ordenes.routes";
import detallesOrdenesRouter from "./routes/detalles_ordenes.routes";

const app = express();

app.set("port", 3000);

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(productos);
app.use(categorias);
app.use(ordenes);
app.use(clientes);
app.use(detallesOrdenesRouter)

export default app;
