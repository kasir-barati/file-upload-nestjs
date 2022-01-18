import { FileWithRelations } from '../files.type';

export class FileRoDto {
    id: number;

    constructor(file: FileWithRelations) {
        this.id = file.id;
    }
}
