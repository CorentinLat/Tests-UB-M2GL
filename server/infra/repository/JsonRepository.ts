import { promises as fs } from 'fs';

export class JsonRepository<T> {
    private readonly filePath: string;

    protected constructor(folder: string, modelName: string) {
        this.filePath = `./${folder}/${modelName}.json`;
    }

    protected async add(data: T): Promise<boolean> {
        const items = await this.readJson();
        items.push(data);
        return this.writeJson(items);
    }

    protected async readJson(): Promise<T[]> {
        try {
            const json = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(json);
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    protected async writeJson(data: T[]): Promise<boolean> {
        try {
            await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}
