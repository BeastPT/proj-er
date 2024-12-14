import { getUserByData, createUser as createUserDB } from '../models/user.js'
import { createPacient, getPacientByNUS } from '../models/pacient.js'

/**
 * @param {String} req.body.fullname Nome de utilizador
 * @param {String} req.body.password Palavra pass
 * @param {String} req.body.email Email do utilizador
 * @param {String} req.body.phone Phone
 * @param {*} res 
 * @returns User or Error
 */
async function createUser(req, res) {
    const { email, password, fullname, phone } = req.body
    if (!(email && password && fullname && phone)) {
        res.status(400).json({message: 'Missing required fields 1'})
        return
    }

    if (await getUserByData({ email })) {
        res.status(400).json({message: 'Email already in use'})
        return
    }
    
    // Verifica se o email é válido
    if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))) {
        res.status(400).json({message: 'Invalid Email'})
        return
    }

    // Verifica se o fullname é válido (apenas letras, espaços, '-', '' e sem espaços extras no início ou no fim)
    if (!(/^[a-zA-Z]+(?:[\s'-][a-zA-Z]+)*$/.test(fullname))) {
        res.status(400).json({ message: 'Invalid Fullname'});
        return
    }

    // Verificar se existe algum utilizador com o mesmo email
    if (await getUserByData({ email })) {
        res.status(400).json({message: 'Email already in use'})
        return
    }

    if (!(/^[9][0-9]{8}$/.test(phone))) {
        res.status(400).json({message: 'Invalid Phone Number'})
        return
    }

    // Verifica se a senha é válida (letras, números, caracteres especiais)
    if (password.length < 5) {
        res.status(400).json({message: 'Invalid Password: Password must be at least 5 characters long'})
        return
    }

    const user = await createUserDB({ email, password, email, phone, fullname }) // Cria um novo utilizador

    return user
}

export async function register(req, res) {
    const { birth_date, nus } = req.body
    if (!nus) {
        return res.status(400).json({message: 'Missing required fields 2'})
    }

    // parse birth_date to type: Date,
    if (birth_date) {
        let birth_date = new Date(birth_date)
        if (isNaN(birth_date)) {
            return res.status(400).json({message: 'Invalid Birth Date'})
        }
    }
    
    if (!(/^[0-9]{9}$/.test(nus))) {
        return res.status(400).json({message: 'Invalid NUS'})
    } else {
        let tempPacient = await getPacientByNUS(parseInt(nus))
        if (tempPacient) {
            return res.status(400).json({message: 'NUS already in use'})
        }
    }

    const user = await createUser(req, res)

    if (!user) {
        return
    }

    if (user instanceof Error) {
        return res.status(400).json({message: user.message})
    }

    const pacient = await createPacient({ birth_date, nus, user: user._id }) // Cria um novo paciente

    if (pacient instanceof Error) {
        return res.status(400).json({message: pacient.message})
    }

    res.status(200).json(pacient)
}


export async function login(req, res) {
    const { email, password } = req.body
    if (!(email && password)) {
        return res.status(400).json({message: 'Missing required fields'})
    }

    const user = await getUserByData({ email })
    if (!user) {
        return res.status(400).json({message: 'Invalid Email'})
    }

    if (password.localeCompare(user.password) != 0) {
        return res.status(400).json({message: 'Invalid Credentials'})
    }
    user.password = undefined // Remove a palavra pass do objeto a passar para o client

    res.status(200).json({ user: user })
}






// /**
//  * 
//  * @param {String} req.body.oldpassword Antiga palavra pass
//  * @param {String} req.body.newpassword Nova palavra pass
//  * @param {*} res 
//  * @returns Status 400 se falhou ou 200 se teve sucesso
//  */
// export async function updatepassword(req, res) {
//     const { oldpassword, newpassword } = req.body
//     if (!(oldpassword && newpassword)) {
//         return res.status(400).json({message: 'Missing required fields'})
//     }

//     const user = await getUserByData({ email: req.user.email })
//     if (!user) {
//         return res.status(400).json({message: 'Invalid User'})
//     }

//     if (!await bcrypt.compare(oldpassword, user.password)) {
//         return res.status(400).json({message: 'Invalid Credentials'})
//     }

//     if (!isValidPassword(newpassword)) {
//         return res.status(400).json({message: 'Invalid New Password'})
//     }

//     const hashedPassword = await bcrypt.hash(newpassword, 10) // Encripta a palavra pass
//     user.password = hashedPassword // Atualiza a palavra pass no documento
//     await user.save() // Salva o documento
//     res.status(200).json({message: 'Password updated successfully'})
// }