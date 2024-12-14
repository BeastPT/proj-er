export default async function admin(req, res, next) { // Middleware de autenticação do utilizador
    try {
        const token = req.headers['authorization'] // Recebe o token do cabeçalho
        if (token !== 'admin') {
            return res.status(401).json({message: 'Unauthorized User'})
        }
        next()
    } catch (err) {
        res.status(401).json({message: 'Unauthorized User'}) // Se o token for inválido, retorna 401
    }
}