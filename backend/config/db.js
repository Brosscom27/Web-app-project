import mongoose from "mongoose";

export default class DB{
    static async connectDB(DB_URI){
        try{
            mongoose.connect(DB_URI);
        }catch(err){
            console.error(err.message);
            process.exit(1)
        }
        const dbConnection = mongoose.connection;
        dbConnection.once("open" ,(_) =>{
            console.log(`Data base connected: ${DB_URI}`)
        });

        dbConnection.on("error", (err) => {
            console.error(`connection error: ${err}`);
        });
        return;

    }
};