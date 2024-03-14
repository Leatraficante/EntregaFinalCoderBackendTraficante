import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración módulo Carts', () => {
    it('POST /api/carts debe crear un carrito nuevo a la DB', async () => {
        const mockCart = {
            name: 'Nuevo Carrito Test',
        };

        const { statusCode, _body } = await requester.post('/api/carts')
            .set('Cookie', ['coderCookieToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1YzRlMjAxMWUxMGQ2NWVlMzQ5M2NkZiIsImZpcnN0X25hbWUiOiJBRE1JTiIsImxhc3RfbmFtZSI6IkFETUlOIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5hZCIsImFnZSI6MTAwLCJyb2xlIjoiQURNSU4iLCJfX3YiOjB9LCJpYXQiOjE3MDc0MDE3MzgsImV4cCI6MTcwNzQ4ODEzOH0.qK66FnR32F0IBXOBJuIshvbNlyxBnSfBcElR80-_V5Y'])
            .send(mockCart);
        
        expect(statusCode).to.be.eql(201)
        expect(mockCart).to.be.an('object');
        expect(_body.data).to.have.property('_id');
        expect(_body.data).to.have.property('user');
        
    });
});
