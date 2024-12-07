import request from 'supertest';

import server from '../../../../../src/ui/express/ExpressServer';

import { clearData } from '../../../../utils';

describe('ApiUserRouter', () => {
    let token: string;

    beforeAll(async () => {
        clearData();

        await request(server).post('/open/register').send({ name: 'Corentin', email: 'corentin@mail.fr', password: 'Passw0rd' });
        await request(server).post('/open/register').send({ name: 'Stéphane', email: 'stephane@mail.fr', password: 'Passw0rd' });
        const response = await request(server).post('/open/login').send({ email: 'corentin@mail.fr', password: 'Passw0rd' });
        token = response.body.token;
    });

    afterAll(() => {
        clearData(true);
        server.close();
    });

    describe('/api/user', () => {
        it('should return 401 if user is not authenticated', async () => {
            const response = await request(server)
                .get('/api/user')
                .send();

            expect(response.status).toBe(401);
        });

        it('should return 200 and users list if user is authenticated', async () => {
            const response = await request(server)
                .get('/api/user')
                .set('Authorization', `Bearer ${token}`)
                .send();

            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(2);
            expect(response.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(String),
                        name: 'Corentin',
                        email: 'corentin@mail.fr'
                    }),
                    expect.objectContaining({
                        id: expect.any(String),
                        name: 'Stéphane',
                        email: 'stephane@mail.fr'
                    })
                ])
            );
        });
    });
});
