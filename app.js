/** Importações */
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//Config JSON response
app.use(express.json())

//Models
const Profile = require('./models/Profile')

//Open Route - Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nossa API!'})
})

//Register Profile
app.post('/auth/register', async(req, res) => {
    const { 
        nome, 
        nome_usuario, 
        email, 
        senha,
    } = req.body

    //Validações
    if(!nome && !nome_usuario && !email && !senha) {
        return res.status(422).json({ msg: "Dados do nome, nome do usuário, email e senha são obrigatórios" })
    }
    if(!nome) {
        return res.status(422).json({ msg: "O nome é obrigatório" })
    }
    if(!nome_usuario) {
        return res.status(422).json({ msg: "O nome do usuário é obrigatório" })
    }
    if(!email) {
        return res.status(422).json({ msg: "O email é obrigatório" })
    }
    if(!senha) {
        return res.status(422).json({ msg: "A senha é obrigatória" })
    }

    //Checando se o usuário já existe
    const userExists = await Profile.findOne({ email: email })
    if(userExists) {
        return res.status(422).json({ msg: "Usuário já cadastrado, com esse email!" })
    }

    //Criando a senha criptografada
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(senha, salt)

    //Criando o usuário
    const profile = new Profile({
        nome, 
        nome_usuario, 
        email, 
        senha: passwordHash,
    })

    try {
        await profile.save()
        res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' })
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Houve um erro no servidor!" })
    }
})

//Login Profile
app.post("/auth/login", async(req, res) => {
    const {  
        email, 
        senha,
    } = req.body

    // Validações
    if(!email && !senha) {
        return res.status(422).json({ msg: "Dados de email e senha são obrigatórios" })
    }
    if(!email) {
        return res.status(422).json({ msg: "O email é obrigatório" })
    }
    if(!senha) {
        return res.status(422).json({ msg: "A senha é obrigatório" })
    }

    // Checando se o usuário existe
    const profile = await Profile.findOne({ email: email })
    if(!profile) {
        return res.status(404).json({ msg: "Usuário não encontrado!" })
    }

    // Match das senhas
    const checkPassword = await bcrypt.compare(senha, profile.senha)
    if(!checkPassword) {
        return res.status(422).json({ msg: "Senha inválida!" })
    }

    try {
        const secret = process.env.SECRET
        const token = jwt.sign(
            { id: profile.id }, 
            secret, 
            { expiresIn: 86400 }, //1 dia
        )

        res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token })
    } catch (error) {
        console.log(error)
        res.status(404).json({ msg: "Houve um erro no servidor!" })
    }
})


//Credencials
const dbURI = process.env.DB_ATLAS_URI

//Conexão com o banco no mongoDB_Atlas
mongoose
    .connect(dbURI)
    .then(() => {
        app.listen(3000)
        console.log("Conectou ao banco!")
    })
    .catch((err) => console.log(err))


