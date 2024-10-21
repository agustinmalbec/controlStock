import { userService } from "../services/service.js";
//import { logger } from '../middleware/logger.middleware.js';

class UserController {
    constructor() {
        this.controller = userService;
    }

    async getUsers() {
        try {
            return await this.controller.getUsers();
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getUserByDNI(dni) {
        try {
            return await this.controller.getUserByDNI(dni);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async getUserById(id) {
        try {
            return await this.controller.getUserById(id);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async createUser(user) {
        try {
            return await this.controller.createUser(user);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async updateUser(dni, user) {
        try {
            return await this.controller.updateUser(dni, user);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }

    async deleteUser(dni) {
        try {
            return await this.controller.deleteUser(dni);
        } catch (error) {
            console.log(`Ha ocurrido un error: ${error}`);
        }
    }
}

const userController = new UserController();
export default userController;