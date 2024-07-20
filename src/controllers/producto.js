import { getConnection } from "./../database/database";

// Get all products
const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT P.idproducto, P.nombre as Producto, P.descripcion, C.nombre as Categoria, P.stock, P.precio from producto P inner join categoria C on P.idcategoria = C.idcategoria;");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get product by ID
const getProducto = async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT P.idproducto,  P.nombre as Producto, P.descripcion, C.nombre as Categoria, P.stock, P.precio from producto P inner join categoria C on P.idcategoria = C.idcategoria WHERE P.idproducto = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Add a new product
const addProducto = async (req, res) => {
    try {
        const { nombre, descripcion, categoria, cantidad,  precio } = req.body;
        
        if (nombre === undefined || descripcion === undefined || categoria === undefined || cantidad === undefined || precio === undefined ) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO producto (nombre, descripcion, idcategoria, stock, precio)
                                                VALUES ('${nombre}', '${descripcion}','${categoria}','${cantidad}','${precio}')`);
        res.json({ "message": "Producto Registrado Correctamente" });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Update an existing product
const updateProducto = async (req, res) => {
    try {
        const { id, nombre, descripcion, precio, cantidad, categoria } = req.body;
        if (id === undefined || nombre === undefined || descripcion === undefined || precio === undefined || cantidad === undefined || categoria === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE producto SET nombre = '${nombre}',
                                                descripcion = '${descripcion}', 
                                                idcategoria = '${categoria}',
                                                precio = '${precio}',
                                                stock = '${cantidad}'
                                                WHERE idproducto = '${id}'`);
        res.status(200).json({ "message": "Producto Actualizado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


// Delete a product
const delProducto = async (req, res) => {
    try {
        const { id } = req.body;
        if (id === undefined) {
            res.status(400).json({ "message": "Bad Request. Please provide an id." });
        }
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM producto WHERE idproducto = ?", id);
        res.status(200).json({ "message": "Producto Eliminado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {
    getProductos,
    getProducto,
    addProducto,
    updateProducto,
    delProducto
};
