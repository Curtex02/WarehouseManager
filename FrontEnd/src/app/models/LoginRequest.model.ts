export class LoginRequest {
    email:string;
    password:string;
    role:string;

    constructor() {
        this.email = '';
        this.password = '';
        this.role = '';
    }
}