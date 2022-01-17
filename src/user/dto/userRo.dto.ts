import { UserWithRelations } from '../user.type';

export class UserRoDto {
    firstname: string;
    lastname: string;
    email: string;

    constructor(user: UserWithRelations) {
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.emailAddress;
    }
}
