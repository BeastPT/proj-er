import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fullname: String,
    address: String,
    address_number: Number,
    postal_code: String,
    country: String,
    city: String,
    nacionality: String,
    image_url: String
}, { timestamps: true })

const model = mongoose.model('User', userSchema)

/**
 * @typedef {Object} User
 * @property {string} username
 * @property {string} email
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




// #### Não utilizados ####