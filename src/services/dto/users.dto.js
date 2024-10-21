export default class UserDTO {
    constructor({ first_name, last_name, dni, password, history, last_connection }) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.dni = dni;
        this.password = password;
        this.history = history;
        this.last_connection = last_connection;
    }
}