import mongoose from "mongoose";

export async function connect() {
    try {
        // Since its a promise and its no guarantee that it will resolve. hence we use ! to take care of it manually and avoid the error.
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        // Listen for the event "on" in the connection
        connection.on("connected", () => {
            console.log("Connected to Database");
        })

        connection.on("error", (err)=>{
            console.log("MongoDB connection error", err);
            process.exit()
        })

    } catch (error) {
        console.log("Something went wrong ", error)
    }
}