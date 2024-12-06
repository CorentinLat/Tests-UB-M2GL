export type User = {
    id: string;
    name: string;
    email: string;
};

export type CreateUser = Omit<User, 'id'> & { password: string };
