import { getUserByEmail } from '../models/user.js'

export default async function auth(req, res, next) { // Middleware de autenticação do utilizador
    try {
        const token = req.headers['authorization'] // Recebe o token do cabeçalho
        if (!token) {
            return res.status(401).json({message: 'Unauthorized User'})
        }

        if(token == 'development') {
            req.email = 'a@b.co' // Adiciona o nome de utilizador ao pedido
            req.user = await getUserByEmail(req.email) // Adiciona o utilizador ao pedido
            req.userId = req.user._id // Adiciona o ID do utilizador ao pedido
        } else {
            req.email = token // Adiciona o nome de utilizador ao pedido
            req.user = await getUserByEmail(token) // Adiciona o utilizador ao pedido
            req.userId = req.user._id // Adiciona o ID do utilizador ao pedido
        }
        
        next()
    } catch (err) {
        res.status(401).json({message: 'Unauthorized User: '+err}) // Se o token for inválido, retorna 401
    }
}