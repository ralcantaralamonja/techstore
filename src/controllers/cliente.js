import { getConnection } from "./../database/database";

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM cliente");
        if (result.length === 0) return res.status(404).json({ message: "No se encontraron clientes." });
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener un cliente por su ID
const getCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM cliente WHERE idcliente = ?", [id]);
        if (result.length === 0) return res.status(404).json({ message: "Cliente no encontrado." });
        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Agregar un nuevo cliente
// Agregar un nuevo cliente
const addCliente = async (req, res) => {
    try {
        const { nombre, email, telefono, direccion } = req.body;

        if (!nombre || !email || !telefono || !direccion) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO cliente (nombre, email, telefono, direccion)
                                                VALUES ('${nombre}', '${email}', '${telefono}', '${direccion}')`);
        // Obtener el id del nuevo cliente
        const idcliente = result.insertId;
        res.json({ message: "Cliente Registrado Correctamente", idcliente });
        
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar un cliente existente
const updateCliente = async (req, res) => {
    try {
        const { id, nombre, email, telefono, direccion } = req.body;

        if (!id || !nombre || !email || !telefono || !direccion) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query('UPDATE cliente SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE idcliente = ?', [nombre, email, telefono, direccion, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente no encontrado." });
        res.json({ message: "Cliente Actualizado Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar un cliente
const delCliente = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Bad Request. Please provide an id." });
        }

        const connection = await getConnection();
        const result = await connection.query('DELETE FROM cliente WHERE idcliente = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Cliente no encontrado." });
        res.json({ message: "Cliente Eliminado Correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    delCliente
};
