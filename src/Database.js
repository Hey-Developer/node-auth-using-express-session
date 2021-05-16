const mongoose = require("mongoose");
const chalk = require("chalk");

const database_name = process.env.DB_NAME;
const server_name = process.env.SERVER_NAME;

const connectionURL = `mongodb://${server_name}/${database_name}`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    console.log(
      chalk.magentaBright.bold("Please Wait connecting to MongoDb Local Server")
    );

    mongoose
      .connect(connectionURL, options)
      .then(() => {
        console.log(
          chalk.green.italic.bold(
            "Connected Successfully to MongoDb Local Server"
          )
        );
      })
      .catch((err) => {
        console.log(chalk.red.bold(`Something went wrong,${err.message}`));
      });
  }
}

module.exports = new Database();
