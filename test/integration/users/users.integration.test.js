import { expect } from 'chai';
import supertest from 'supertest';

const requester = supertest('http://localhost:8080');

describe('Pruebas de integración módulo Users', () => {
    let cookie;

    it('Debemos registrar un usuario correctamente', async () => {
        const userMock = {
            first_name: 'Usuario',
            last_name: 'Test',
            email: 'test123@test.test',
            age: 100,
            password: '1234',
            role: 'USER',
        };

        const { statusCode } = await requester.post('/api/users/register').send(userMock);
        expect(statusCode).to.be.eql(201);
    });

    it('Debemos loguear al usuario y retornar una cookie', async () => {
        const credentialsMock = {
            email: 'test123@test.test',
            password: '1234'
        };

        const loginResult = await requester.post('/api/users/login').send(credentialsMock);
        const cookieResult = loginResult.headers['set-cookie'][0];

        expect(cookieResult).to.be.ok;

        const cookieResultSplit = cookieResult.split('='); 

        cookie = {
            name: cookieResultSplit[0], 
            value: cookieResultSplit[1] 
        }

        expect(cookie.name).to.be.ok.and.eql('coderCookieToken'); 
        expect(cookie.value).to.be.ok;
    });
})