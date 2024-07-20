import { getConnection } from "./../database/database";

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT P.idproducto, P.nombre AS Producto, P.descripcion, C.nombre AS Categoria, P.stock, P.precio
            FROM producto P
            INNER JOIN categoria C ON P.idcategoria = C.idcategoria;
        `);
        if (result.length === 0) return res.status(404).json({ message: "No se encontraron productos." });
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener un producto por ID
const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query(`
            SELECT P.idproducto, P.nombre AS Producto, P.descripcion, C.nombre AS Categoria, P.stock, P.precio
            FROM producto P
            INNER JOIN categoria C ON P.idcategoria = C.idcategoria
            WHERE P.idproducto = ?
        `, [id]);
        if (result.length === 0) return res.status(404).json({ message: "Producto no encontrado." });
        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Agregar un nuevo producto
const addProducto = async (req, res) => {
    try {
        const { nombre, descripcion, categoria, cantidad, precio } = req.body;

        if (!nombre || !descripcion || !categoria || !cantidad || !precio) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`
            INSERT INTO producto (nombre, descripcion, idcategoria, stock, precio)
            VALUES (?, ?, ?, ?, ?)
        `, [nombre, descripcion, categoria, cantidad, precio]);

        res.status(201).json({ message: "Producto Registrado Correctamente", idproducto: result.insertId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar un producto existente
const updateProducto = async (req, res) => {
    try {
        const { id, nombre, descripcion, precio, cantidad, categoria } = req.body;

        if (!id || !nombre || !descripcion || !precio || !cantidad || !categoria) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`
            UPDATE producto
            SET nombre = ?, descripcion = ?, idcategoria = ?, precio = ?, stock = ?
            WHERE idproducto = ?
        `, [nombre, descripcion, categoria, precio, cantidad, id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado." });
        res.json({ message: "Producto Actualizado Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar un producto
const delProducto = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Bad Request. Please provide an id." });
        }

        const connection = await getConnection();
        const result = await connection.query("DELETE FROM producto WHERE idproducto = ?", [id]);

        if (result.affectedRows === 0) return res.status(404).json({ message: "Producto no encontrado." });
        res.json({ message: "Producto Eliminado Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getProductos,
    getProducto,
    addProducto,
    updateProducto,
    delProducto
};
