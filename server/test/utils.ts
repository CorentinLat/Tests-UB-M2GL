import { existsSync, mkdirSync, rmSync } from 'fs';

import { JsonRepositories } from '../src/infra/repository/JsonRepositories';

export const clearData = (force: boolean = false) => {
    const dataFolder = JsonRepositories.saveFolder;

    if (existsSync(dataFolder)) {
        rmSync(dataFolder, { force: true, recursive: true });
    }

    if (!force) {
        mkdirSync(dataFolder);
    }
};
