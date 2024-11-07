import UserDTO from "../dto/users.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.service = dao;
    }

    async getUsers() {
        return await this.service.getUsers();
    }

    async getUserByDNI(dni) {
        return await this.service.getUserByDNI(dni);
    }

    async getUserById(id) {
        return await this.service.getUserById(id);
    }

    async createUser(user) {
        const newUser = new UserDTO(user);
        return await this.service.createUser(newUser);
    }

    async updateUser(id, user) {
        return await this.service.updateUser(id, user);
    }

    async deleteUser(id) {
        return await this.service.deleteUser(id);
    }
}