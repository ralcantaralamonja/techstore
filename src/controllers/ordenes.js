import { getConnection } from "./../database/database";


const getOrdenes = async (req, res) => {
    try {
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("SELECT * FROM ordenes");
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener órdenes:", error.message);
        res.status(500).send(error.message);
    }
};


const getOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("SELECT * FROM ordenes WHERE orden_id = ?", [id]);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener la orden:", error.message);
        res.status(500).send(error.message);
    }
};

// Agregar una nueva orden
const addOrden = async (req, res) => {
    try {
        const { cliente_id, fecha, total, estado } = req.body;

        if (!cliente_id || !fecha || !total || !estado) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "INSERT INTO ordenes (cliente_id, fecha, total, estado) VALUES (?, ?, ?, ?)",
            [cliente_id, fecha, total, estado]
        );

        res.status(201).json({ message: "Orden agregada correctamente", orden_id: result.insertId });
    } catch (error) {
        console.error("Error al agregar orden:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar una orden existente
const updateOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const { cliente_id, fecha, total, estado } = req.body;

        if (!cliente_id || !fecha || !total || !estado) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "UPDATE ordenes SET cliente_id = ?, fecha = ?, total = ?, estado = ? WHERE orden_id = ?",
            [cliente_id, fecha, total, estado, id]
        );

        res.status(200).json({ message: "Orden actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar orden:", error.message);
        res.status(500).send(error.message);
    }
};

// Eliminar una orden
const delOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("DELETE FROM ordenes WHERE orden_id = ?", [id]);
        res.status(200).json({ message: "Orden eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar orden:", error.message);
        res.status(500).send(error.message);
    }
};

export const methods = {
    getOrdenes, getOrden, addOrden, updateOrden, delOrden
};
