import { UserWithRelations } from '../user.type';

export class UserRoDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;

    constructor(user: UserWithRelations) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.emailAddress;
    }
}
