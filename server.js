const app = require("./app.js");
require("dotenv").config();
const dbo = require("./src/db/conn"); // Faz conexão com o MongoDB

const port = process.env.SERVER_PORT || 8080;

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  // Se err for passado como argumento, significa que houve algum problema
  if (err) {
    console.error(err);
    process.exit(); // Encerra o programa na presença de erro
  }

  // Inicia o servidor Express
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
