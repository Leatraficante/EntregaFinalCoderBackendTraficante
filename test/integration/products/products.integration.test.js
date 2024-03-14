import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración módulo Products', () => {
    it('POST /api/products debe agregar un producto nuevo a la DB', async () => {
        const mockProduct = {
            title: 'Producto de prueba',
            description: 'Descripción de producto prueba',
            code: 'TEST1234',
            price: 50,
            stock: 100,
            category: 'Tech'
        };

        const { statusCode, _body } = await requester.post('/api/products')
            .set('Cookie', ['coderCookieToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YzRlMjAxMWUxMGQ2NWVlMzQ5M2NkZiIsImZpcnN0X25hbWUiOiJBRE1JTiIsImxhc3RfbmFtZSI6IkFETUlOIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5hZCIsImFnZSI6MTAwLCJyb2xlIjoiQURNSU4iLCJfX3YiOjB9LCJpYXQiOjE3MDc0MDE3MzgsImV4cCI6MTcwNzQ4ODEzOH0.qK66FnR32F0IBXOBJuIshvbNlyxBnSfBcElR80-_V5Y'])
            .send(mockProduct);
        
        expect(statusCode).to.be.eql(201)
        expect(_body.data).to.have.property('_id');

    });

    it('POST /api/products debería retornar 400 si los datos ingresados no son válidos (ej: falta un valor requerido)', async () => {
        const invalidMockProduct = {
            title: 'Producto de prueba Invalido',
            description: 'Descripción de producto prueba Invalido',
            stock: 100,
            category: 'Tech'
        };

        const { statusCode } = await requester.post('/api/products')
            .set('Cookie', ['coderCookieToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YzRlMjAxMWUxMGQ2NWVlMzQ5M2NkZiIsImZpcnN0X25hbWUiOiJBRE1JTiIsImxhc3RfbmFtZSI6IkFETUlOIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5hZCIsImFnZSI6MTAwLCJyb2xlIjoiQURNSU4iLCJfX3YiOjB9LCJpYXQiOjE3MDc0MDE3MzgsImV4cCI6MTcwNzQ4ODEzOH0.qK66FnR32F0IBXOBJuIshvbNlyxBnSfBcElR80-_V5Y'])
            .send(invalidMockProduct);

        expect(statusCode).to.be.deep.eql(400);
    });
});
