import mongoose from "mongoose"


const connectDB = async () => { 
    
     try {
          await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true});
        console.log(`Database connected successfully`);
     } catch (error) {
       console.log("Error while connection with the database", error) 
     }

 }

 export default connectDB