import { CustomBaseEntity } from '../entity';
import { Id, Uuid } from '../types';

export class BaseRoDto {
    id!: Id | Uuid;

    constructor(entity: CustomBaseEntity<Id> | CustomBaseEntity<Uuid>) {
        this.id = entity.id;
    }
}
