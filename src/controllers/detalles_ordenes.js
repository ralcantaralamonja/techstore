import { getConnection } from "../database/database";

// Agregar detalle de orden
const addDetalleOrden = async (req, res) => {
    try {
        const { orden_id, producto_id, cantidad, precio } = req.body;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "INSERT INTO detalles_ordenes (orden_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)",
            [orden_id, producto_id, cantidad, precio]
        );

        res.status(201).json({ message: "Detalle de orden agregado correctamente", detalle_id: result.insertId });
    } catch (error) {
        console.error("Error al agregar detalle de orden:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Obtener detalles de una orden específica
const getDetallesOrden = async (req, res) => {
    try {
        const { orden_id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "SELECT * FROM detalles_ordenes WHERE orden_id = ?",
            [orden_id]
        );

        res.json(result);
    } catch (error) {
        console.error("Error al obtener detalles de orden:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


const getOrdens = async (req, res) => {
    try {
        const { orden_id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "SELECT * FROM detalles_ordenes "

        );

        res.json(result);
    } catch (error) {
        console.error("Error al obtene:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};


// Actualizar detalle de orden
const updateDetalleOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad, precio } = req.body;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "UPDATE detalles_ordenes SET cantidad = ?, precio = ? WHERE detalle_id = ?",
            [cantidad, precio, id]
        );

        res.status(200).json({ message: "Detalle de orden actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar detalle de orden:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Eliminar detalle de orden
const deleteDetalleOrden = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "DELETE FROM detalles_ordenes WHERE detalle_id = ?",
            [id]
        );

        res.status(200).json({ message: "Detalle de orden eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar detalle de orden:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const methods = {
    addDetalleOrden,
    getDetallesOrden,
    updateDetalleOrden,
    deleteDetalleOrden,
    getOrdens
};
