export type FullUser = {
    id: string;
    name: string;
    email: string;
    hashedPassword: string;
};

export type UserToCreate = Omit<FullUser, 'id' | 'hashedPassword'> & { password: string };
export type DisplayUser = Omit<FullUser, 'hashedPassword'>;
