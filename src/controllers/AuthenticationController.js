const UserService = require("../services/UserService");
const utils = require("../utils/utils");

module.exports = {
    async doLogin(req, res) {
        if (req.body.hasOwnProperty('username')) {
            const userLogin = await UserService.getByUsername(req.body.username);

            if (userLogin) {
                console.log(userLogin);
                // Compara a senha enviada para o login com a senha do MongoDB
                const authenticated = await utils.comparePwd(req.body.pwd, userLogin.pwd);
                if (authenticated) {
                    const token = utils.signJwt(userLogin._id);
                    // Monta o cabeçalho com o Token
                    res.set('Authorization', `Bearer ${token}`);
                    res.status(200).send({ id: userLogin._id, username: userLogin.username});
                }
            } else {
                res.status(400).send("Senha e/ou usuário incorretos");
            }
        } else {
            res.status(400).send("Objeto de requisição deve conter um atributo username");
        }
    },

    doLogout(req, res) {
        res.set('Authorization', `Bearer `);
        res.status(200).send();
    },
}