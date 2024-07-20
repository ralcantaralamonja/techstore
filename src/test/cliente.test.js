import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { methods as clienteMethods } from '../controllers/cliente';

const app = express();
app.use(bodyParser.json());

app.get('/clientes', clienteMethods.getClientes);
app.get('/cliente/:id', clienteMethods.getCliente);
app.post('/cliente', clienteMethods.addCliente);
app.put('/cliente', clienteMethods.updateCliente);
app.delete('/cliente', clienteMethods.delCliente);

describe('Cliente Controller', () => {
    afterAll(async () => {
        // Cerrar conexiones abiertas
        await new Promise(resolve => setTimeout(resolve, 1000)); // Ajusta el tiempo según sea necesario
    });

    it('should get all clients', async () => {
        const response = await request(app).get('/clientes');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a client by ID', async () => {
        // Asegúrate de que el cliente con ID 1 exista antes de hacer la prueba
        const response = await request(app).get('/cliente/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('idcliente');
    });

    it('should add a new client', async () => {
        const response = await request(app).post('/cliente').send({
            nombre: 'New Client',
            email: 'new.client@example.com',
            telefono: '123456789',
            direccion: '123 Main St'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Cliente Registrado Correctamente');
    });

    it('should handle missing fields when adding a client', async () => {
        const response = await request(app).post('/cliente').send({
            nombre: 'Incomplete Client'
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please fill all fields.');
    });

    it('should update a client', async () => {
        // Asegúrate de que el cliente con ID 1 exista antes de actualizarlo
        const response = await request(app).put('/cliente').send({
            id: 1,
            nombre: 'Updated Client',
            email: 'updated.client@example.com',
            telefono: '987654321',
            direccion: 'Updated Address'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Cliente Actualizado Correctamente');
    });

    it('should handle missing fields when updating a client', async () => {
        const response = await request(app).put('/cliente').send({
            id: 1,
            nombre: ''
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please fill all fields.');
    });

    it('should delete a client', async () => {
        // Asegúrate de que el cliente con ID 1 exista antes de eliminarlo
        await request(app).post('/cliente').send({ 
            nombre: 'Temporary Client', 
            email: 'temp.client@example.com', 
            telefono: '123456789', 
            direccion: '123 Temp St' 
        });

        const response = await request(app).delete('/cliente').send({ id: 1 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Cliente Eliminado Correctamente');
    });

    it('should handle missing fields when deleting a client', async () => {
        const response = await request(app).delete('/cliente').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please provide an id.');
    });
});
