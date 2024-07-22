import { getConnection } from "./../database/database";

// Obtener todas las órdenes
const getOrdenes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM orden");
        if (result.length === 0) return res.status(404).json({ message: "No se encontraron órdenes." });
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener una orden por su ID
const getOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT O.idorden, O.idcliente, P.nombre, D.cantidad, O.total, O.estado FROM orden O INNER JOIN detallesorden D ON O.idorden = D.idorden INNER JOIN producto P ON D.idproducto = P.idproducto WHERE O.idorden = ?", [id]);
        if (result.length === 0) return res.status(404).json({ message: "Orden no encontrada." });
        res.json(result[0]); // Retorna el primer elemento del array
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Agregar una nueva orden
const addOrden = async (req, res) => {
    try {
        const { idcliente, productos, cantidades } = req.body;

        if (!idcliente || !productos || !cantidades || productos.length !== cantidades.length) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields correctly." });
        }

        const connection = await getConnection();

        const result = await connection.query("INSERT INTO orden (idcliente, total, estado) VALUES (?, 0, 'pendiente')", [idcliente]);
        const idorden = result.insertId;

        for (let i = 0; i < productos.length; i++) {
            await connection.query("INSERT INTO detallesorden (idproducto, cantidad, idorden) VALUES (?, ?, ?)", [productos[i], cantidades[i], idorden]);
        }

        res.json({ message: "Orden Registrada Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar una orden existente
const updateOrden = async (req, res) => {
    try {
        const { id, estado } = req.body;

        if (!id || !estado) {
            return res.status(400).json({ message: "Bad Request. Please provide both id and estado." });
        }

        const connection = await getConnection();
        const result = await connection.query("UPDATE orden SET estado = ? WHERE idorden = ?", [estado, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Orden no encontrada." });
        res.json({ message: "Estado de Orden Actualizado Correctamente" });
    } catch (error) {
        res.status(500).json({ message: error.message }); // Incluye el mensaje de error en la respuesta
    }
};

// Eliminar una orden
const delOrden = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Bad Request. Please provide an id." });
        }

        const connection = await getConnection();
        await connection.query("DELETE FROM detallesorden WHERE idorden = ?", [id]);
        await connection.query("DELETE FROM orden WHERE idorden = ?", [id]);
        res.json({ message: "Orden Eliminada Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getOrdenes,
    getOrden,
    addOrden,
    updateOrden,
    delOrden
};
