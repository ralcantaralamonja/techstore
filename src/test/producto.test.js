import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { methods as productoController } from '../controllers/producto'; // Ajusta el path si es necesario

const app = express();
app.use(bodyParser.json());

app.get('/productos', productoController.getProductos);
app.get('/producto/:id', productoController.getProducto);
app.post('/producto', productoController.addProducto);
app.put('/producto', productoController.updateProducto);
app.delete('/producto', productoController.delProducto);

describe('Producto Controller', () => {
    let createdProductId;

    afterAll(async () => {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Ajusta el tiempo según sea necesario
    });

    it('should get all products', async () => {
        const response = await request(app).get('/productos');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a product by ID', async () => {
        const response = await request(app).get('/producto/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('idproducto');
    });

    it('should add a new product', async () => {
        const response = await request(app).post('/producto').send({
            nombre: 'Test Product',
            descripcion: 'Test description',
            categoria: 1,
            cantidad: 10,
            precio: 100.0
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Producto Registrado Correctamente');
        expect(response.body).toHaveProperty('idproducto');
        
        createdProductId = response.body.idproducto;
        console.log('Producto creado ID:', createdProductId); // Añadir log para depuración
    });

    it('should handle missing fields when adding a product', async () => {
        const response = await request(app).post('/producto').send({
            nombre: '',
            descripcion: '',
            categoria: '',
            cantidad: '',
            precio: ''
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please fill all fields.');
    });

    it('should update an existing product', async () => {
        const response = await request(app).put('/producto').send({
            id: createdProductId,
            nombre: 'Updated Product',
            descripcion: 'Updated description',
            precio: 150.0,
            cantidad: 20,
            categoria: 1
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Producto Actualizado Correctamente');
    });

    it('should handle missing fields when updating a product', async () => {
        const response = await request(app).put('/producto').send({
            id: createdProductId,
            nombre: '',
            descripcion: '',
            precio: '',
            cantidad: '',
            categoria: ''
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please fill all fields.');
    });

    it('should add and delete a product', async () => {
        // Añade un producto
        const responseAdd = await request(app).post('/producto').send({
            nombre: 'Temporary Product',
            descripcion: 'Temporary description',
            categoria: 1,
            cantidad: 10,
            precio: 100.0
        });
        expect(responseAdd.status).toBe(201);
        expect(responseAdd.body).toHaveProperty('message', 'Producto Registrado Correctamente');
        expect(responseAdd.body).toHaveProperty('idproducto');
        
        createdProductId = responseAdd.body.idproducto;
        console.log('Producto temporal creado ID:', createdProductId); // Añadir log para depuración

        // Da tiempo para que el producto sea registrado
        await new Promise(resolve => setTimeout(resolve, 3000)); // Aumenta el tiempo si es necesario

        // Obtén el producto recién creado
        const addedProduct = await request(app).get('/productos');
        console.log('Productos después de añadir:', addedProduct.body); // Añadir log para depuración
        const product = addedProduct.body.find(p => p.idproducto === createdProductId);
        console.log('Producto encontrado:', product); // Añadir log para depuración
        expect(product).toBeDefined();
        expect(product).toHaveProperty('idproducto');

        // Luego, elimina el producto
        const responseDelete = await request(app).delete('/producto').send({ id: product.idproducto });
        expect(responseDelete.status).toBe(200);
        expect(responseDelete.body).toHaveProperty('message', 'Producto Eliminado Correctamente');
    });
});
