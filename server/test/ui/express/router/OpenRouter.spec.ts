import request from 'supertest';

import server from '../../../../src/ui/express/ExpressServer';

import { clearData } from '../../../utils';

describe('OpenRouter', () => {
    beforeAll(clearData);

    afterAll(() => {
        clearData(true);
        server.close();
    });

    describe('/open/register', () => {
        it('should return 400 if no data is sent', async () => {
            const response = await request(server)
                .post('/open/register')
                .send();

            expect(response.status).toBe(400);
        });

        it('should return 400 if email is invalid', async () => {
            const response = await request(server)
                .post('/open/register')
                .send({
                    name: 'Corentin',
                    email: 'corentin@',
                    password: 'Passw0rd'
                });

            expect(response.status).toBe(400);
        });

        it('should return 201 when user is created', async () => {
            const response = await request(server)
                .post('/open/register')
                .send({
                    name: 'Corentin',
                    email: 'corentin@mail.fr',
                    password: 'Passw0rd'
                });

            expect(response.status).toBe(201);
        });
    });

    describe('/open/login', () => {
        it('should return 401 if user does not exist', async () => {
            const response = await request(server)
                .post('/open/login')
                .send({
                    email: 'notme@mail.fr',
                    password: 'Passw0rd'
                });

            expect(response.status).toBe(401);
        });

        it('should return 401 if password is invalid', async () => {
            const response = await request(server)
                .post('/open/login')
                .send({
                    email: 'corentin@mail.fr',
                    password: 'Password'
                });

            expect(response.status).toBe(401);
        });

        it('should return 200 and token when user is successfully logged', async () => {
            const response = await request(server)
                .post('/open/login')
                .send({
                    email: 'corentin@mail.fr',
                    password: 'Passw0rd'
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
            expect(response.body.token).toBeTruthy();
        });
    });
});
