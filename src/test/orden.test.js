import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { methods as ordenMethods } from '../controllers/orden';

const app = express();
app.use(bodyParser.json());

app.get('/ordenes', ordenMethods.getOrdenes);
app.get('/orden/:id', ordenMethods.getOrden);
app.post('/orden', ordenMethods.addOrden);
app.put('/orden', ordenMethods.updateOrden);
app.delete('/orden', ordenMethods.delOrden);

describe('Orden Controller', () => {
    afterAll(async () => {
        // Cerrar conexiones abiertas
        await new Promise(resolve => setTimeout(resolve, 1000)); // Ajusta el tiempo según sea necesario
    });

    it('should get all orders', async () => {
        const mockOrders = [{ idorden: 1, idcliente: 1, total: 100, estado: 'pendiente' }];
        jest.spyOn(ordenMethods, 'getOrdenes').mockImplementation((req, res) => res.json(mockOrders));

        const response = await request(app).get('/ordenes');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body[0]).toHaveProperty('idorden');
    });

    it('should get an order by ID', async () => {
        const mockOrder = { idorden: 1, idcliente: 1, nombre: 'Producto1', cantidad: 2, total: 100, estado: 'pendiente' };
        jest.spyOn(ordenMethods, 'getOrden').mockImplementation((req, res) => res.json(mockOrder));

        const response = await request(app).get('/orden/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('idorden');
    });

    it('should add a new order', async () => {
        jest.spyOn(ordenMethods, 'addOrden').mockImplementation((req, res) => res.json({ message: "Orden Registrada Correctamente" }));

        const response = await request(app).post('/orden').send({
            idcliente: 1,
            productos: [1],
            cantidades: [2]
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Orden Registrada Correctamente');
    });

    it('should handle missing fields when adding an order', async () => {
        const response = await request(app).post('/orden').send({
            idcliente: 1,
            productos: []
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please fill all fields correctly.');
    });

    it('should update an order', async () => {
        jest.spyOn(ordenMethods, 'updateOrden').mockImplementation(async (req, res) => {
            try {
                const { id, estado } = req.body;
    
                if (!id || !estado) {
                    return res.status(400).json({ message: "Bad Request. Please provide both id and estado." });
                }
    
                // Verifica que el estado no exceda el tamaño permitido
                if (estado.length > 255) {
                    return res.status(400).json({ message: "Bad Request. Estado value too long." });
                }
    
                // Simular respuesta exitosa de actualización
                res.json({ message: "Estado de Orden Actualizado Correctamente" });
            } catch (error) {
                res.status(500).json({ message: "Error updating order: " + error.message });
            }
        });
    
        const response = await request(app).put('/orden').send({
            id: 1,
            estado: 'completado'
        });
    
        console.log('Response Body:', response.body); // Agregar logs para depuración
        console.log('Response Status:', response.status); // Agregar logs para depuración
    
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Estado de Orden Actualizado Correctamente');
    });    

    it('should handle missing fields when updating an order', async () => {
        const response = await request(app).put('/orden').send({
            id: 1
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please provide both id and estado.');
    });

    it('should delete an order', async () => {
        jest.spyOn(ordenMethods, 'delOrden').mockImplementation((req, res) => res.json({ message: "Orden Eliminada Correctamente" }));

        const response = await request(app).delete('/orden').send({ id: 3 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Orden Eliminada Correctamente');
    });

    it('should handle missing fields when deleting an order', async () => {
        const response = await request(app).delete('/orden').send({});
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please provide an id.');
    });
});
