import { getConnection } from "./../database/database"

const getProductos = async (req, res) => {
    try {
        const connection = await getConnection()
        await connection.query("USE techstore")

        const result = await connection.query("SELECT * FROM productos")
        console.log(result)
        res.json(result)
    } catch (error) {
        console.error("Error al obtener productos:", error.message); // Loggea el error para diagnóstico
        res.status(500).send(error.message)
    }
}

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, cantidad_en_stock, categoria_id } = req.body;

        if (!nombre || !descripcion || !precio || !cantidad_en_stock || !categoria_id) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad_en_stock = ?, categoria_id = ? WHERE producto_id = ?",
            [nombre, descripcion, precio, cantidad_en_stock, categoria_id, id]
        );

        res.status(200).json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar producto:", error.message);
        res.status(500).send(error.message);
    }
};

const delProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection()
        await connection.query("USE techstore")
        const result = await connection.query("DELETE FROM productos WHERE producto_id = ?", [id]);
        res.status(200).json({ "message": "Delete user ok" })
    } catch (error) {
        res.status(500)
        res.send(error.message)
    }
}

const getProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore")

        const result = await connection.query("SELECT * from productos WHERE producto_id = ?", [id]);
        console.log(result);
        res.json(result)
    } catch (error) {
        res.status(500);
        res.send(error.message)
    }
}

const addProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidad_en_stock, categoria_id } = req.body;

        // Validar que todos los campos requeridos estén presentes
        if (!nombre || !descripcion || !precio || !cantidad_en_stock || !categoria_id) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        // Obtener una conexión a la base de datos
        const connection = await getConnection();
        await connection.query("USE techstore");

        // Ejecutar la consulta SQL para insertar un nuevo producto
        const result = await connection.query(
            `INSERT INTO productos (nombre, descripcion, precio, cantidad_en_stock, categoria_id) 
                VALUES (?, ?, ?, ?, ?)`,
            [nombre, descripcion, precio, cantidad_en_stock, categoria_id]
        );

        // Confirmar que el producto fue agregado correctamente
        res.status(201).json({ message: "Producto agregado correctamente", producto_id: result.insertId });
    } catch (error) {
        console.error("Error al agregar producto:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export const methods = {
    getProductos, updateProducto, delProducto, getProducto, addProducto

}