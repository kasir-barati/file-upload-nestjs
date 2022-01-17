import { CustomBaseEntity } from '../entity';
import { Id, Uuid } from '../types';

export class BaseRoForAdminDto {
    id!: Id | Uuid;

    createdAt?: Date;

    updatedAt?: Date;

    constructor(entity: CustomBaseEntity<Id> | CustomBaseEntity<Uuid>) {
        this.id = entity.id;
        this.createdAt = entity.createdAt;
        this.updatedAt = entity.updatedAt;
    }
}
