import { getUserByData, createUser } from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
const SECRET_KEY = process.env.SECRET_KEY || 'SECRET'

/**
 * @param {String} req.body.username Nome de utilizador
 * @param {String} req.body.password Palavra pass
 * @param {String} req.body.email Email do utilizador
 * @param {*} res 
 * @returns Status 400 se falhou ou 200 se teve sucesso e (token, user)
 */
export async function register(req, res) {
    const { email, password, username } = req.body
    if (!(email && password && username)) {
        return res.status(400).json({message: 'Missing required fields'})
    }
    
    // Verifica se o email é válido
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
        return res.status(400).json({message: 'Invalid Email'})
    }

    // Verifica se o username é válido (letras, números, '-', '_', '.')
    if (!(/^[a-zA-Z][a-zA-Z\d-_\.]+$/.test(username))) {
        return res.status(400).json({message: 'Invalid Username'})
    }

    // Verificar se existe algum utilizador com o mesmo email
    if (await getUserByData({ email })) {
        return res.status(400).json({message: 'Email already in use'})
    }

    // Verificar se existe algum utilizador com o mesmo username
    if (await getUserByData({ username })) {
        return res.status(400).json({message: 'Username already in use'})
    }

    // Verifica se a senha é válida (letras, números, caracteres especiais)
    if (!isValidPassword(password)) {
        return res.status(400).json({message: 'Invalid Password'})
    }
    const hashedPassword = await bcrypt.hash(password, 10) // Encripta a palavra pass
    const user = await createUser({ email, password: hashedPassword, username }) // Cria um novo utilizador
    const jwtoken = jwt.sign({ email, username }, SECRET_KEY) // Cria um token com o email e username
    user.password = undefined // Remove a palavra pass do objeto a passar para o client
    res.status(201).json({ token: jwtoken, user: user })
} 

/**
 * @param {String} req.body.username Nome de utilizador
 * @param {String} req.body.password Palavra pass 
 * @param {*} res 
 * @returns Status 400 se falhou ou 200 se teve sucesso e (token, user)
 */
export async function login(req, res) {
    const { username, password } = req.body
    if (!(username && password)) {
        return res.status(400).json({message: 'Missing required fields'})
    }

    const user = await getUserByData({ username })
    if (!user) {
        return res.status(400).json({message: 'Invalid Username'})
    }

    if (!await bcrypt.compare(password, user.password)) { // Verifica se a palavra pass é igual à palavra pass encriptada
        return res.status(400).json({message: 'Invalid Credentials'})
    }

    const jwtoken = jwt.sign({ email: user.email, username: user.username }, SECRET_KEY) // Cria um token com o email e username
    user.password = undefined // Remove a palavra pass do objeto a passar para o client
    res.status(200).json({ token: jwtoken, user: user })
}

/**
 * 
 * @param {String} req.body.oldpassword Antiga palavra pass
 * @param {String} req.body.newpassword Nova palavra pass
 * @param {*} res 
 * @returns Status 400 se falhou ou 200 se teve sucesso
 */
export async function updatepassword(req, res) {
    const { oldpassword, newpassword } = req.body
    if (!(oldpassword && newpassword)) {
        return res.status(400).json({message: 'Missing required fields'})
    }

    const user = await getUserByData({ email: req.user.email })
    if (!user) {
        return res.status(400).json({message: 'Invalid User'})
    }

    if (!await bcrypt.compare(oldpassword, user.password)) {
        return res.status(400).json({message: 'Invalid Credentials'})
    }

    if (!isValidPassword(newpassword)) {
        return res.status(400).json({message: 'Invalid New Password'})
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10) // Encripta a palavra pass
    user.password = hashedPassword // Atualiza a palavra pass no documento
    await user.save() // Salva o documento
    res.status(200).json({message: 'Password updated successfully'})
}

/**
 * 
 * @param {String} password
 * @returns {boolean} If is a valid password 
 */
function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/.test(password)
}