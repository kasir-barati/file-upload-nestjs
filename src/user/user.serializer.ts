import { Injectable } from '@nestjs/common';
import { UserRoDto } from './dto';
import { Pagination } from '@src/shared/libs/tapsa-repository/tapsa-repository.type';
import { BaseSerializer } from '@src/shared/libs/tapsa-serializer';
import { UserWithRelations } from './user.type';

@Injectable()
export class UserSerializer extends BaseSerializer<
    UserWithRelations,
    UserRoDto
> {
    public async serialize(
        user: UserWithRelations,
        outputType: 'UserRoDto',
    ): Promise<UserRoDto> {
        if (outputType === 'UserRoDto') {
            return new UserRoDto(user);
        }
    }

    public async serializePaginated(
        value: Pagination<UserWithRelations>,
        outputType: 'UserRoDto',
    ): Promise<Pagination<UserRoDto>> {
        let paginated: Pagination<UserRoDto>;

        if (outputType === 'UserRoDto') {
            paginated = new Pagination<UserRoDto>(
                value.items.map((address) => new UserRoDto(address)),
                value.meta,
                value.links,
            );
        }

        return paginated;
    }
}
