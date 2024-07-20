import { getConnection } from "./../database/database";

// Get all clients
const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT * from cliente");
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Get client by ID
const getCliente = async (req, res) => {
    try {
        const { id } = req.body;
        const connection = await getConnection();
        const result = await connection.query("SELECT * from cliente WHERE idcliente = ?", id);
        console.log(result);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Add a new client
const addCliente = async (req, res) => {
    try {
        const { nombre, email, telefono, direccion } = req.body;
        
        if (nombre === undefined || email === undefined || telefono === undefined || direccion === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }

        const connection = await getConnection();
        const result = await connection.query(`INSERT INTO cliente (nombre, email, telefono, direccion)
                                                VALUES ('${nombre}', '${email}', '${telefono}', '${direccion}')`);
        res.json({ "message": "Cliente Registrado Correctamente" });
        
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Update an existing client
const updateCliente = async (req, res) => {
    try {
        const { id, nombre, email, telefono, direccion } = req.body;
        if (id === undefined || nombre === undefined || email === undefined || telefono === undefined || direccion === undefined) {
            res.status(400).json({ "message": "Bad Request. Please fill all fields." });
        }
        const connection = await getConnection();
        const result = await connection.query(`UPDATE cliente SET nombre = '${nombre}', 
                                                email = '${email}', 
                                                telefono = '${telefono}', 
                                                direccion = '${direccion}' 
                                                WHERE idcliente = '${id}'`);
        res.status(200).json({ "message": "Cliente Actualizado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

// Delete a client
const delCliente = async (req, res) => {
    try {
        const { id } = req.body;
        if (id === undefined) {
            res.status(400).json({ "message": "Bad Request. Please provide an id." });
        }
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM cliente WHERE idcliente = ?", id);
        res.status(200).json({ "message": "Cliente Eliminado Correctamente" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

export const methods = {
    getClientes,
    getCliente,
    addCliente,
    updateCliente,
    delCliente
};
