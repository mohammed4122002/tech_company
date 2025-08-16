import mongoose from "mongoose";

const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO as string);
      
    }
    catch(err){
      
        throw new Error("Failed to connect to MongoDB");
    }
}
export default connect;