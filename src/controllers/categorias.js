import { getConnection } from "./../database/database";

// Obtener todas las categorías
const getCategorias = async (req, res) => {
    try {
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("SELECT * FROM categorias");
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener categorías:", error.message);
        res.status(500).send(error.message);
    }
};

// Obtener una categoría específica
const getCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("SELECT * FROM categorias WHERE categoria_id = ?", [id]);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener la categoría:", error.message);
        res.status(500).send(error.message);
    }
};

// Agregar una nueva categoría
const addCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)",
            [nombre, descripcion]
        );

        res.status(201).json({ message: "Categoría agregada correctamente", categoria_id: result.insertId });
    } catch (error) {
        console.error("Error al agregar categoría:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar una categoría existente
const updateCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "UPDATE categorias SET nombre = ?, descripcion = ? WHERE categoria_id = ?",
            [nombre, descripcion, id]
        );

        res.status(200).json({ message: "Categoría actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar categoría:", error.message);
        res.status(500).send(error.message);
    }
};

// Eliminar una categoría
const delCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("DELETE FROM categorias WHERE categoria_id = ?", [id]);
        res.status(200).json({ message: "Categoría eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar categoría:", error.message);
        res.status(500).send(error.message);
    }
};

export const methods = {
    getCategorias, getCategoria, addCategoria, updateCategoria, delCategoria
};
