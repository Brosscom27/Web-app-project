import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String
    },
    photo: {
        type: String,
        default: 'https://cloud.appwrite.io/v1/storage/buckets/667d06be00136d314152/files/667d2a3100194735e6ee/view?project=667d063f002ac3c7d928&mode=admin',
        required: false
    }
});

UserSchema.statics.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

UserSchema.statics.compare = async (password, receivpassword) => {
    return await bcrypt.compare(password, receivpassword);
}

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
