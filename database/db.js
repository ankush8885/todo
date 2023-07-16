import mongoose from "mongoose";

export const DataBaseConnect = function () {
    mongoose.connect(process.env.MONGO_URI).then(() =>
        console.log('Database is connected')).catch((e) =>
            console.log(e));
}