import { Id } from '../types';

export interface ICustomBaseEntity<T = Id> {
    id: T;
    createdAt?: Date;
    updatedAt?: Date;
    agencyId?: Id;
}

export abstract class CustomBaseEntity<T = Id> implements ICustomBaseEntity<T> {
    id!: T;
    createdAt?: Date;
    updatedAt?: Date;

    static isTenantSupport(): boolean {
        return false;
    }
}

export abstract class CustomTenantBaseEntity<T = Id>
    implements ICustomBaseEntity<T>
{
    id!: T;
    createdAt?: Date;
    updatedAt?: Date;
    agencyId!: Id;

    static isTenantSupport(): boolean {
        return true;
    }
}
