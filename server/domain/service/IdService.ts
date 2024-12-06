import { v4 as uuidv4 } from 'uuid';

export class IdService {
    static generateId = () => uuidv4();
}
