import { IUserRepository } from './IUserRepository';

export interface IRepositories {
    getUserRepository(): IUserRepository;
}
