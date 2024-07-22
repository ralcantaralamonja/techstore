import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { methods as categoriaMethods } from '../controllers/categoria';

const app = express();
app.use(bodyParser.json());

app.get('/categorias', categoriaMethods.getCategorias);
app.get('/categoria/:id', categoriaMethods.getCategoria);
app.post('/categoria', categoriaMethods.addCategoria);
app.put('/categoria', categoriaMethods.updateCategoria);
app.delete('/categoria', categoriaMethods.delCategoria);

describe('Categoria Controller', () => {
    afterAll(async () => {
        // Cerrar conexiones abiertas
        await new Promise(resolve => setTimeout(resolve, 1000)); // Ajusta el tiempo según sea necesario
    });

    it('should get all categories', async () => {
        const response = await request(app).get('/categorias');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should get a category by ID', async () => {
        // Asegúrate de que la categoría con ID 1 exista antes de hacer la prueba
        const response = await request(app).get('/categoria/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('idcategoria');
    });

    it('should add a new category', async () => {
        const response = await request(app).post('/categoria').send({
            nombre: 'New Category',
            descripcion: 'Category description'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Categoría Registrada Correctamente');
    });

    it('should handle missing fields when adding a category', async () => {
        const response = await request(app).post('/categoria').send({
            nombre: ''
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please fill all fields.');
    });

    it('should update a category', async () => {
        // Asegúrate de que la categoría con ID 1 exista antes de actualizarla
        const response = await request(app).put('/categoria').send({
            id: 1,
            nombre: 'Updated Category',
            descripcion: 'Updated description'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'Categoría Actualizada Correctamente');
    });

    it('should handle missing fields when updating a category', async () => {
        const response = await request(app).put('/categoria').send({
            id: 1,
            nombre: ''
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Bad Request. Please fill all fields.');
    });

    it('should delete a category', async () => {
        // Primero, añade una categoría para poder eliminarla
        const responseAdd = await request(app).post('/categoria').send({
            nombre: 'Temporary Category',
            descripcion: 'Temporary description'
        });
        expect(responseAdd.status).toBe(200);
    
        // Obtén el ID de la categoría recién creada
        const addedCategory = await request(app).get('/categorias');
        const category = addedCategory.body.find(cat => cat.nombre === 'Temporary Category');
        expect(category).toBeDefined(); // Verifica que la categoría se haya creado
        const categoryId = category.idcategoria;
    
        // Luego, elimina la categoría usando el ID en el cuerpo de la solicitud
        const responseDelete = await request(app).delete('/categoria').send({ id: categoryId }); // Usa el ID real aquí
        expect(responseDelete.status).toBe(200);
        expect(responseDelete.body).toHaveProperty('message', 'Categoría Eliminada Correctamente');
    });
});
