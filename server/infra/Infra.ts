import { IInfra } from '../domain/IInfra';

import { IRepositories } from '../domain/repository/IRepositories';
import { JsonRepositories } from './repository/JsonRepositories';

export class Infra implements IInfra {
    private readonly repositories: IRepositories = new JsonRepositories();

    getRepositories = (): IRepositories => this.repositories;
}
