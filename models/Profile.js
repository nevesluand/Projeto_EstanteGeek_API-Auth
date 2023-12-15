const mongoose = require('mongoose')

const Profile = mongoose.model('Profile', {
    nome: String,
    nome_usuario: String,
    email: String,
    senha: String
}) 

module.exports = Profile