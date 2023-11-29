
require('dotenv').config();
// Isso nos ajudará a conectar com o banco de dados
const dbo = require('../db/conn');
const {ObjectId} = require("mongodb");
const collName = 'users';

module.exports = {
    async create(matchUser, callbackAtlasResponse) {
        const dbConnect = dbo.getDb();

        await dbConnect
            .collection(collName)
            .insertOne(matchUser, callbackAtlasResponse);
    },

    async deleteByUsername(req, res, next) {

    },

    async update(req, res, next) {

    },

    async getUserById(userId){
        const dbConnect = dbo.getDb();
        return await dbConnect
            .collection(collName)
            .findOne(
                {
                    // Quando buscar por Id, é importante encapusalar o Id dentro de um objeto ObjectId
                    // ver mais em https://www.mongodb.com/docs/manual/reference/method/ObjectId/ 
                    _id: ObjectId(userId)
                }
            );
    },

    async getByUsername(username) {
        const dbConnect = dbo.getDb();

        return await dbConnect
            .collection(collName)
            .findOne(
                // {
                //     $where: () => {
                //         return this.username == username 
                //     }
                // }
                {
                    username:username
                }
                // projection configura quais campos irão ser retornados pelo MongDB
                // , {
                // projection: {
                //     _id: 1,
                //     username: 1,
                //     pwd: 1,
                // }
            );
    },
}
