import { validateUserCreation } from '../../../src/domain/validator/user.validator';

describe('.validateUserCreation()', () => {
    it('should return false if name is empty', () => {
        const res = validateUserCreation({
            name: '',
            email: '',
            password: ''
        });

        expect(res).toBe(false);
    });

    it('should return false if email is empty', () => {
        const res = validateUserCreation({
            name: 'Corentin',
            email: '',
            password: ''
        });

        expect(res).toBe(false);
    });

    it('should return false if password is empty', () => {
        const res = validateUserCreation({
            name: 'Corentin',
            email: 'corentin',
            password: ''
        });

        expect(res).toBe(false);
    });

    it('should return false if name is less than 3 characters', () => {
        const res = validateUserCreation({
            name: 'co',
            email: 'corentin',
            password: 'Password'
        });

        expect(res).toBe(false);
    });

    it('should return false if email is not valid', () => {
        const res = validateUserCreation({
            name: 'Corentin',
            email: 'corentin',
            password: 'Password'
        });

        expect(res).toBe(false);
    });

    it('should return false if password has not at least one character and one number', () => {
        const res = validateUserCreation({
            name: 'Corentin',
            email: 'corentin@mail.fr',
            password: 'Password'
        });

        expect(res).toBe(false);
    });

    it('should return true if all fields are valid', () => {
        const res = validateUserCreation({
            name: 'Corentin',
            email: 'corentin@mail.fr',
            password: 'Passw0rd'
        });

        expect(res).toBe(true);
    });
});
