const { MongoClient } = require("mongodb");
require('dotenv').config();

const connectionString = process.env.ATLAS_URI;

// Client para conexão com o MongoDB
const client = new MongoClient(connectionString, {
  useNewUrlParser: true, // Para ativar/desativar versões do parser
  useUnifiedTopology: true, // Une os conceitos de topologia do Mongo (`Mongos`, `ReplSet`, and `Server`) é uma único. Tem a ver com descoberta de servidores Mongodb.
});

let dbConnection;

module.exports = {
  // callback: função que será executada quando o servidor iniciar
  connectToServer: function (callback) {
    client.connect(
      // db é o objeto que permite acesso aos bancos no Altas MongoDB
      function (err, db) {
        if (err || !db) {
          return callback(err);
        }

        dbConnection = db.db("almoxarifado_users");
        console.log("Conexão com o MongoDB bem sucedida.");

        return callback();
      }
    );
  },

  getDb: function () {
    return dbConnection;
  },
};
