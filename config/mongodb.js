const mongoose = require("mongoose");

const connectToMongoDB = async (url) => {
    mongoose.connect(
        url,
        await console.log("⚡️[database] MongoDB: Connection to database successful!")
    );
};

module.exports = connectToMongoDB;