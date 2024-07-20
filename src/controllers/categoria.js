import { getConnection } from "./../database/database";

// Obtener todas las categorías
const getCategorias = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from categoria");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener una categoría por su ID
const getCategoria = async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * from categoria WHERE idcategoria = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Agregar una nueva categoría
const addCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        
        if (!nombre || !descripcion) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO categoria (nombre, descripcion)
                                                VALUES ('${nombre}', '${descripcion}')`);
        res.json({ "message": "Categoría Registrada Correctamente" });
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar una categoría existente
const updateCategoria = async (req, res) => {
    try {
        const { id } = req.body;
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`UPDATE categoria SET nombre = '${nombre}', 
                                                descripcion = '${descripcion}' 
                                                WHERE idcategoria = '${id}'`);
        res.json({ "message": "Categoría Actualizada Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar una categoría
const delCategoria = async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categoria WHERE idcategoria = ?", id);
        res.json({ "message": "Categoría Eliminada Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getCategorias,
    getCategoria,
    addCategoria,
    updateCategoria,
    delCategoria
};
