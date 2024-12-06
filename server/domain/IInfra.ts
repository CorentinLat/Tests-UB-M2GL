import { IRepositories } from './repository/IRepositories';

export interface IInfra {
    getRepositories(): IRepositories;
}
