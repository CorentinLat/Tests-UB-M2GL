import { UserToCreate } from '../entity/User';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const validateUserCreation = (user: UserToCreate): boolean => {
    if (!user.name || !user.email || !user.password) return false;

    if (user.name.length < 3) return false;
    if (!emailRegex.test(user.email)) return false;
    if (!passwordRegex.test(user.password)) return false;

    return true;
};
