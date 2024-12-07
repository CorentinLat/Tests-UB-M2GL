import jwt from 'jsonwebtoken';

import { UserService } from '../../../src/application/service/UserService';

import { SpecUserRepository } from '../../infra/repository/SpecUserRepository';
import { AuthService } from '../../../src/domain/service/AuthService';

describe('UserService', () => {
    let userService: UserService;
    let userRepo: SpecUserRepository;

    beforeEach(() => {
        userRepo = new SpecUserRepository();
        userService = new UserService(userRepo);
    });

    describe('.logUser()', () => {
        it('should return null if user does not exist', async () => {
            jest.spyOn(userRepo, 'getUserByEmail').mockResolvedValue(undefined);

            const token = await userService.logUser('', '');

            expect(token).toBeNull();
        });

        it('should return null if user does not exist', async () => {
            jest.spyOn(userRepo, 'getUserByEmail').mockResolvedValue({
                id: '1',
                name: 'Corentin',
                email: 'corentin@mail.fr',
                hashedPassword: await AuthService.hashPassword('Passw0rd')
            });

            const token = await userService.logUser('corentin@mail.fr', 'Passw0rd1');

            expect(token).toBeNull();
        });

        it('should not return null if user exists and password is good', async () => {
            jest.spyOn(userRepo, 'getUserByEmail').mockResolvedValue({
                id: '1',
                name: 'Corentin',
                email: 'corentin@mail.fr',
                hashedPassword: await AuthService.hashPassword('Passw0rd')
            });

            const token = await userService.logUser('corentin@mail.fr', 'Passw0rd');

            expect(token).not.toBeNull();
        });

        it('should return one token with user information if user exists and password is good', async () => {
            jest.spyOn(userRepo, 'getUserByEmail').mockResolvedValue({
                id: '1',
                name: 'Corentin',
                email: 'corentin@mail.fr',
                hashedPassword: await AuthService.hashPassword('Passw0rd')
            });

            const token = await userService.logUser('corentin@mail.fr', 'Passw0rd');

            const decodedToken = jwt.decode(token!);
            expect(decodedToken).toMatchObject({
                id: '1',
                name: 'Corentin',
                email: 'corentin@mail.fr',
            });
        });
    });
});
