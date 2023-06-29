const { connect, connection } = require("mongoose");

connect(process.env.MONGODB_URI || "mongodb://localhost/social-network-api");

connection.on("connected", () => {
  console.log("Mongoose connected");
});

connection.on("error", (err) => {
  console.log("Mongoose error: ", err);
});

module.exports = connection;
