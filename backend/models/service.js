/*
 - type ( /!\ VERIFICAR )
 - clientid
 - state (Ativo / Finalizado / Cancelado)
 - rating ( 1-5 estrelas / null )
 - data (criacao)
 - price 

*/

import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['market', 'programming', 'translation', 'learning', 'fitness', 'writing', 'other'],
        required: true,
        default: 'other'
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    state: {
        type: String,
        enum: ['active', 'finished', 'cancelled'],
        required: true,
        default: 'active'
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },

}, { timestamps: true })

const model = mongoose.model('Service', serviceSchema)

/**
 * @typedef {Object} Service
 * @property {UUID} requester
 * @property {UUID} chat
 * @property {string} type ['financeiro', 'programacao', 'traducao', 'aprendizagem', 'bem-estar', 'escrita', 'outro'] default: 'outro'
 * @property {number} rating [1-5] default: null
 * @property {string} state ['active', 'finished', 'cancelled'] default: 'active'
 * @property {number} price default: 0
 */

/**
 * 
 * @param {Service} data
 * @returns {Service}
 */
export async function createService(data) {
    return await model.create(data)
}

/**
 * 
 * @param {UUID} id Service ID
 * @returns {Service | null}
 */
export async function getServiceById(id) {
    return await model.findById(id).exec()
}

/**
 * 
 * @param {UUID} requesterId User ID
 * @returns {Service[]}
*/
export async function getServicesByRequesterId(requesterId) {
    return await model.find({ requester: requesterId }).limit(10).exec()
}

/**
 * 
 * @param {UUID} id Service ID
 * @param {number} price Price to increment
 * @returns {Service | null} Updated Document
 */
export async function incrementPrice(id, price) {
    return await model.findByIdAndUpdate(id, { $inc: { price: price } }, { new: true }).exec()
}




// #### Não utilizados ####
/**
 * 
 * @param {UUID} id Service ID
 * @param {Service} data Data to update
 * @returns {Service} Updated Document
 */
export async function updateServiceData(id, data) {
    return await model.findByIdAndUpdate(id, data, { new: true }).exec()
}

/**
 * Função para obter a quantidade de serviços criados por um utilizador num mês
 * @param {UUID} userId Service ID
 * @param {number} month month: 0-11
 * @returns {number} 
 */
async function getServicesAmountByMonth(userId, month) {
    try {
        return await model.find({ requester: userId, createdAt: { $gte: new Date(new Date().getFullYear(), month, 1), $lt: new Date(new Date().getFullYear(), month + 1, 1) } }).countDocuments().exec()
    } catch (error) {
        return 0
    }
}

/**
 * Função para obter a quantidade de serviços criados por um utilizador em cada mes nos últimos 6 meses
 * @param {UUID} userId Service ID
 * @returns {number[]} Array with the amount of services created by the user in the last 6 months
 */
export async function getServicesAmountByLast6Months(userId) {
    const month = new Date().getMonth()
    const months = []
    for (let i = 0; i < 6; i++) {
        months.push((month - i) % 12)
    }
    const result = []
    for (let i = 0; i < 6; i++) {
        result.push(await getServicesAmountByMonth(userId, months[i]))
    }
    return result.reverse() 
}