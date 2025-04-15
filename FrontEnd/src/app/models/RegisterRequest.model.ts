export class RegisterRequest {
    email:string;
    name: string;
    password:string;
    role:string;

    constructor() {
        this.email = '';
        this.name = '';
        this.password = '';
        this.role = '';
    }
}
