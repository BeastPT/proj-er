import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ['service', 'support'],
        required: true,
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: false,
        default: null
    },
    subject: {
        type: String,
        required: true,
    },
    messages: [{
        isSystem: {
            type: Boolean,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            required: true,
        }
    }]

}, { timestamps: true })

const model = mongoose.model('Chat', chatSchema)

/**
 * @typedef {Object} Message
 * @property {boolean} messages.isSystem
 * @property {string} messages.message
 * @property {Date} messages.timestamp
 */


/**
 * @typedef {Object} Chat
 * @property {UUID} userId
 * @property {string} type ['service', 'support']
 * @property {string} subject
 * @property {Message[]} messages
*/

/**
 * 
 * @param {Chat} data
 * @returns {Chat}
 */
export async function createChat(data) {
    return await model.create(data)
}

/**
 * 
 * @param {UUID} UserId
 * @returns {Chat[] | null}
 */
export async function getChatsByUserId(UserId) {
    return await model.find({ userId: UserId }).select('-messages').limit(9).exec()
}

/**
 * 
 * @param {UUID} id 
 * @returns {Chat | null}
 */

export async function getChatById(id) {
    try {
        return await model.findById(id).exec()
    } catch (error) {
        return null
    }
}

/**
 * 
 * @param {UUID} ChatId Chat Id
 * @param {Message} message
 * @returns {Chat | null}
 */
export async function addMessage(ChatId, message) {
    return await model.findByIdAndUpdate(ChatId, { $push: { messages: message } }, { new: true }).exec()
}

/**
 * 
 * @param {UUID} ChatId Chat Id
 * @param {Message} message
 * @returns {Chat | null}
 */
export async function getSubjectByServiceId(ServiceId) {
    return (await model.findOne({ service: ServiceId }).select('subject').exec()).subject
}




// #### Não utilizados ####

/**
 * 
 * @param {UUID} ServiceId
 * @returns {Chat | null}
 */
export async function getChatByServiceId(ServiceId) {
    return await model.findOne({ service: ServiceId }).exec()
}