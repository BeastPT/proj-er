import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    // address: String,
    // address_number: Number,
    // postal_code: String,
    // country: String,
    // city: String,
    // nacionality: String,
    image_url: String
}, { timestamps: true })

const model = mongoose.model('User', userSchema)

/**
 * @typedef {Object} User
 * @property {string} email
 * @property {string} phone
 * @property {string} fullname
 * @property {string} password
 */

/**
 * 
 * @param {User} data 
 * @returns {User}
 */
export async function createUser(data) {
    return await model.create(data)
}

/**
 * 
 * @param {string} [data.username]
 * @param {string} [data.email]
 * @param {string} [data.phone]
 * @returns {User | null}
 */
export async function getUserByData(data) {
    return await model.findOne(data).exec()
}

/**
 * 
 * @param {UUID} id 
 * @returns {User | null}
 */
export async function getUserById(id) {
    return await model.findById(id).exec()
}

// update user by id
export async function updateUserById(id, data) {
    return await model.findByIdAndUpdate(id, data, { new: true }).exec()
}