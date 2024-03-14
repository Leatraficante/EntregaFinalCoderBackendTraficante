import { expect } from "chai";
import sinon from "sinon";
import * as usersService from '../../../src/services/users.service.js';

describe('Users service', () => {
    it('Deberia retornar un usuario segun email', async () => {
        const email = 'test@test.test';

        const stubUser = {
            first_name: 'MockUser',
            last_name: 'MockUser',
            email: 'test@test.test',
            password: 'TEST123456789',
            role: 'admin',
        };

        const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(stubUser);

        const result = await usersService.getByEmail(email);

        expect(stub.calledOnce).to.be.true;

        stub.restore();
    })

    it('Deberia devolver una excepcion por usuario no encontrado', async () => {
        const stub = sinon.stub(usersService.usersRepository, 'getByEmail').returns(null);

        await usersService.getByEmail('test@test.test').catch((error) => {
            expect(error.message).to.eql('user not found')
        })

    })
})