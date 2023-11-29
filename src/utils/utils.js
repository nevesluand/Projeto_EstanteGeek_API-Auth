const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 5;

module.exports ={
    async encryptPwd(pwd){
        const salt = await bcrypt.genSalt(saltRounds);
        try{
            // console.log(pwd);
            // console.log(saltRounds);
            return await bcrypt.hash(pwd.toString(), salt);
        } catch(error){
            console.log(error);
            return undefined;
        }
    }, 

    async comparePwd(uncrypted, encrypted){
        // console.log(uncrypted);
        // console.log(encrypted);
        return await bcrypt.compare(uncrypted.toString(), encrypted);
    }, 

    signJwt(id){
        var token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 600 // expira em 10 minutos
        });
        return token;
    }
}