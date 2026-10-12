import {connect} from 'mongoose'

const mongoURI = process.env.MONGO_URI;
// console.log(mongoURI)
if(!mongoURI) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

let cached = global.mongoose

if(!cached) {
    cached = global.mongoose = {conn:null, promise:null}
}

const connectDB = async () => {
if(cached.conn)
 {
    console.log('connection stablish from cached')
    return cached.conn
 }

 if(!cached.promise){
    cached.promise = connect(mongoURI).then((c) => c.connection)
 }

 try{
cached.conn=await cached.promise
console.log('connection stablish from promise')
 }catch(err){
throw err 
 }
return cached.conn
}

export default connectDB