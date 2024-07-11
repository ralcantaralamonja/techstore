import { getConnection } from "./../database/database";

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        await connection.query("USE techstore");

        const clientes = await connection.query("SELECT * FROM clientes");

        res.status(200).json(clientes);
    } catch (error) {
        console.error("Error al obtener clientes:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
// Obtener un cliente específico
const getCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("SELECT * FROM clientes WHERE cliente_id = ?", [id]);
        console.log(result);
        res.json(result);
    } catch (error) {
        console.error("Error al obtener el cliente:", error.message);
        res.status(500).send(error.message);
    }
};

// Agregar un nuevo cliente
const addCliente = async (req, res) => {
    try {
        const { nombre, email, telefono, direccion_envio } = req.body;

        if (!nombre || !email || !telefono || !direccion_envio) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "INSERT INTO clientes (nombre, email, telefono, direccion_envio) VALUES (?, ?, ?, ?)",
            [nombre, email, telefono, direccion_envio]
        );

        res.status(201).json({ message: "Cliente agregado correctamente", cliente_id: result.insertId });
    } catch (error) {
        console.error("Error al agregar cliente:", error.message);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// Actualizar un cliente existente
const updateCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, telefono, direccion_envio } = req.body;

        if (!nombre || !email || !telefono || !direccion_envio) {
            return res.status(400).json({ message: "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query(
            "UPDATE clientes SET nombre = ?, email = ?, telefono = ?, direccion_envio = ? WHERE cliente_id = ?",
            [nombre, email, telefono, direccion_envio, id]
        );

        res.status(200).json({ message: "Cliente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar cliente:", error.message);
        res.status(500).send(error.message);
    }
};

// Eliminar un cliente
const delCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        await connection.query("USE techstore");

        const result = await connection.query("DELETE FROM clientes WHERE cliente_id = ?", [id]);
        res.status(200).json({ message: "Cliente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar cliente:", error.message);
        res.status(500).send(error.message);
    }
};

export const methods = {
    getClientes, getCliente, addCliente, updateCliente, delCliente
};
