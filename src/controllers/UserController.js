const UserService = require("../services/UserService");
const utils = require("../utils/utils");

module.exports ={
    async createUser(req, res){
        const userToCreate = {
            username: req.body.username,
            email: req.body.email,
            pwd: await utils.encryptPwd(req.body.pwd), //Senha é salva criptografada com bcrypt
            created_in: new Date()
        };

        UserService.create(userToCreate, (err, result) => {
            if (err) {
              res.status(400).send('Erro ao criar um novo usuário!');
            } else {
              console.log(`Um novo usuário foi inserido com o id ${result.insertedId}`);
              res.status(204).send();
            }
         });
    },

    deleteUser(){
      // Não implementado!
    },

    async getUser(req, res){
      const user = await UserService.getUserById(req.params.id);
      console.log(user);
      if(user){
        delete user.pwd;
        res.status(200).send(user);
      }else{
        res.status(404).send("Usuário não encontrado!");
      }
    },

    updateUser(){
      // Não implementado!
    },
}