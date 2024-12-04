import * as Service from '../models/service.js'
import { createChat, getSubjectByServiceId } from '../models/chat.js'

export async function listServices(req, res) { // Lista todos os serviços do utilizador autenticado
    const query = (await Service.getServicesByRequesterId(req.user.id)).map(service => service.toObject()) // Converte o Mongoose Document para um objeto
    const services = await Promise.all(query.map(async (service) => { // Adiciona o assunto ao serviço
        service.subject = await getSubjectByServiceId(service._id)
        return service
    }))

    if (!services) { // Se o utilizador não tiver serviços, retorna 404
        return res.status(404).json({message: 'Services not found'})
    }
    res.status(200).json({message: services}) // Retorna os serviços do utilizador
}

export async function createService(req, res) { // Cria um novo serviço
    const service = await Service.createService({ // Cria o serviço na base de dados
        requester: req.user.id,
        type: req.body.type || null,
        rating: null,
        state: 'active',
        price: 0
    })

    const chat = await createChat({ // Cria o chat na base de dados
        userId: req.user.id,
        type: 'service',
        subject: req.body.subject || 'Desconhecido', // Provavelmente adicionar mais informacao
        messages: [],
        service: service.id
    })

    res.status(200).json({message: {service, chat}}) // Retorna o serviço e o chat criado
}

export async function getService(req, res) { // Lista um serviço pelo :id no GET
    const service = await Service.getServiceById(req.params.id)
    if (!service) {
        return res.status(404).json({message: 'Service not found'}) // Se o serviço não existir, retorna 404
    }

    res.status(200).json({message: service}) // Retorna o serviço
}

export async function editService(req, res) {  // Edita um serviço pelo :id no PATCH
    const service = await Service.getServiceById(req.params.id)
    if (!service) {
        return res.status(404).json({message: 'Service not found'}) // Se o serviço não existir, retorna 404
    }

    if (req.body.rating) {
        if (req.body.rating < 1 || req.body.rating > 5) {
            return res.status(400).json({message: 'Invalid rating'}) // Se a classificação for inválida, retorna 400
        }
        service.rating = req.body.rating
    }
    if (req.body.state) {
        if (!['active', 'finished', 'cancelled'].includes(req.body.state)) {
            return res.status(400).json({message: 'Invalid state'}) // Se o estado for inválido, retorna 400
        }
        service.state = req.body.state
    }

    await service.save()
    res.status(200).json({message: service}) // Retorna o serviço editado
}

export async function getServicesGraph(req, res) { // Lista a quantidade de serviços nos últimos 6 meses ()
    if (!req.user) {
        return res.status(401).json({message: 'Unauthorized'}) // Se o utilizador não estiver autenticado, retorna 401
    }

    const userId = req.user.id
    let arr = []
    try {
        arr = await Service.getServicesAmountByLast6Months(userId)
    } catch (error) {
        console.log(error)
    }
    return res.status(200).json({message: arr})
}
