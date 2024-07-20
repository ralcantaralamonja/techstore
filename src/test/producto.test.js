
import request from 'supertest';
import express from 'express';
import { methods as productoController } from '../controllers/producto'; // Ajusta la ruta si es necesario

const app = express();
app.use(express.json());

// Define las rutas para las pruebas
app.get('/productos', productoController.getProductos);
app.get('/producto', productoController.getProducto); // Modifica si tu ruta usa `:id` en lugar de `body`
app.post('/producto', productoController.addProducto);
app.put('/producto', productoController.updateProducto);
app.delete('/producto', productoController.delProducto);

describe('Producto Controller', () => {
    let createdProductId;

    // Prueba para obtener todos los productos
    test('should get all products', async () => {
        const response = await request(app).get('/productos');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Prueba para obtener un producto por ID
    test('should get a product by ID', async () => {
        const response = await request(app).get('/producto').send({ id: 1 });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('idproducto');
    });

    // Prueba para agregar un nuevo producto
    test('should add a new product', async () => {
        const response = await request(app).post('/producto').send({
            nombre: 'Test Product',
            descripcion: 'Test description',
            categoria: 1, // Asegúrate de que esta categoría exista en tu base de datos
            cantidad: 10,
            precio: 100.0
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Producto Registrado Correctamente');

        // Guarda el ID del producto creado para usar en pruebas posteriores
        createdProductId = response.body.idproducto;
    });

    // Prueba para actualizar un producto existente
    test('should update an existing product', async () => {
        const response = await request(app).put('/producto').send({
            id: createdProductId,
            nombre: 'Updated Product',
            descripcion: 'Updated description',
            precio: 150.0,
            cantidad: 20,
            categoria: 1 // Asegúrate de que esta categoría exista en tu base de datos
        });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Producto Actualizado Correctamente');
    });

    // Prueba para eliminar un producto
    test('should delete a product', async () => {
        const response = await request(app).delete('/producto').send({ id: createdProductId });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Producto Eliminado Correctamente');
    });
});
