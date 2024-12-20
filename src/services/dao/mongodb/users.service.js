import userModel from "../../models/user.model.js";

export default class UserService {
    constructor() {
        this.model = userModel;
    }

    async getUsers() {
        return await this.model.find().lean();
    }

    async getUserByDNI(dni) {
        return await this.model.findOne({ dni: dni });
    }

    async getUserById(id) {
        return await this.model.findById(id);
    }

    async createUser(user) {
        return await this.model.create(user);
    }

    async updateUser(id, user) {
        return await this.model.findByIdAndUpdate({ _id: id }, user);
    }

    async deleteUser(id) {
        return await this.model.deleteOne({ _id: id });
    }
}