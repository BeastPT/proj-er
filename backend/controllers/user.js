import { updateUserById, getUserById } from '../models/user.js'

// Verifica se o URL é de uma imagem
async function isImgUrl(url) {
    try {
        url = new URL(url)
    } catch (e) {
        return false
    }
    return fetch(url, {method: 'HEAD'}).then(res => { // Faz um pedido HEAD para o URL
        return res.headers.get('Content-Type').startsWith('image') // Verifica se o Content-Type é uma imagem
    })
}

// Edita o perfil do utilizador
export async function editProfile(req, res) { 
    const content = req.body // Recebe o corpo do pedido (Valores identificados pelo MODEL)
    const data = {}
    let error = false
    let message = []

    const userP = await getUserById(req.params.id) // Procura o utilizador pelo :ID 
    if (!userP) {
        return res.status(404).json({message: 'User not found'})
    }

    if (userP._id != req.user.id) { // Verifica se o utilizador autenticado é o mesmo que o pedido
        return res.status(403).json({message: 'Unauthorized'})
    }

    if (Object.keys(content).length == 0) { // Verifica se o corpo do pedido está vazio
        error = true
        message.push('Properties to edit are required')
    }

    
    if (content.fullname) { // Verifica se o nome completo é válido
        const regex_fullname = /^[a-zA-ZÀ-ÿ']+(\s[a-zA-ZÀ-ÿ']+)+$/
        if (!(regex_fullname.test(content.fullname))) {
            error = true
            message.push('Invalid Full Name')
        } else {
            data.fullname = content.fullname
        }
    }

    if (content.address) {
        data.address = content.address
    }

    if (content.address_number) { // Verifica se o número da morada é válido
        const regex_address_number = /^[0-9]+$/
        if (!(regex_address_number.test(content.address_number))) {
            error = true
            message.push('Invalid Address Number')
        }
        data.address_number = content.address_number
    }

    if (content.postal_code) {
        data.postal_code = content.postal_code
    }

    const regex_string = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    if (content.country) { // Verifica se o país é válido
        if (regex_string.test(content.country)) {
            error = true
            message.push('Invalid Country')
        }
        data.country = content.country
    }

    if (content.city) { // Verifica se a cidade é válida
        if (regex_string.test(content.city)) {
            error = true
            message.push('Invalid City')
        }
        data.city = content.city
    }

    if (content.nacionality) { // Verifica se a nacionalidade é válida
        if (regex_string.test(content.nacionality)) {
            error = true
            message.push('Invalid Nacionality')
        }
        data.nacionality = content.nacionality
    }

    if (content.image_url) { // Verifica se o URL da imagem é válido
        if (!(await isImgUrl(content.image_url))) {
            error = true
            message.push('Invalid Image URL')
        }
        data.image_url = content.image_url
    }
    if (error) { // Se houver erros, retorna-os
        return res.status(400).json({message: message})
    }
    // Verifica se o utilizador tem o campo de imagem preenchido
    if (Object.keys(data).length == 0) {
        return res.status(400).json({message: 'Properties to edit are required'})
    }

    const user = await updateUserById(req.user.id, data)

    res.status(200).json({message: user})
}

export async function getUser(req, res) { // Retorna a informacao dum utilizador pelo :id no GET
    const user = await getUserById(req.params.id)
    if (!user) {
        return res.status(404).json({message: 'User not found'})
    }

    if (user._id != req.user.id) {
        return res.status(403).json({message: 'Unauthorized'})
    }
    user.password = undefined
    res.status(200).json({message: user})
}