import { getUserByData } from '../models/user.js'

export default async function auth(req, res, next) { // Middleware de autenticação do utilizador
    try {
        const token = req.headers['authorization'] // Recebe o token do cabeçalho
        if (!token) {
            return res.status(401).json({message: 'Unauthorized User'})
        }

        req.email = user.email // Adiciona o nome de utilizador ao pedido
        req.user = await getUserByData({ email: user.email }) // Adiciona o utilizador ao pedido
        next()
    } catch (err) {
        res.status(401).json({message: 'Unauthorized User'}) // Se o token for inválido, retorna 401
    }
}