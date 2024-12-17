import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  return mongoose
    .connect(process.env.DB_URL, {
      dbName: "e-commerce-assignment",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connected");
    });
};

export default connectDB;
