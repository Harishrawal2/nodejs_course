const mongoose = require("mongoose");

const MongoDBConnect = async () => {
  try {
    const DB = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected Succefully ${DB.connection.host}`);
  } catch (error) {
    console.log(`MongoDB Connection Failed ${error}`);
  }
};

module.exports = MongoDBConnect;
