import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    dni: {
        type: Number,
        unique: true,
        required: true,
        index: true,
    },
    password: String,
    role: {
        type: String,
        default: 'operario',
    },
    history: {
        default: [],
        type: [
            {
                name: String,
                reference: String
            }
        ]
    },
    last_connection: String
});

const userModel = mongoose.model('users', userSchema);

export default userModel;