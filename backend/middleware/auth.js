import jwt from 'jsonwebtoken'
const SECRET_KEY = 'SECRET'
import { getUserByData } from '../models/user.js'


export default async function auth(req, res, next) { // Middleware de autenticação do utilizador
    try {
        const token = req.headers['authorization'] // Recebe o token do cabeçalho
        if (!token) {
            return res.status(401).json({message: 'Unauthorized User'})
        }

        const user = jwt.verify(token, SECRET_KEY) // Verifica o token com a chave secreta
        req.username = user.username // Adiciona o nome de utilizador ao pedido
        req.user = await getUserByData({ username: user.username }) // Adiciona o utilizador ao pedido
        next()
    } catch (err) {
        res.status(401).json({message: 'Unauthorized User'}) // Se o token for inválido, retorna 401
    }
}