import mongoose from 'mongoose';

interface UserI {
    _id?: mongoose.Types.ObjectId,
    name?: string,
    image?: string,
    email: string,
    password: string,
    createdAt?: Date,
    updatedAt?:Date,
}


const userSchema = new mongoose.Schema<UserI>({

    name:{
        type: String,
        required: false,

    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    image:{
        type: String
    }


}, {timestamps:true})

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User