import mongoose from "mongoose";

const pacientSchema = new mongoose.Schema({
    birth_date: {
        type: Date,
    },
    nus: {
        type: Number,
        required: true,
        min: 100000000,
        max: 999999999,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

const model = mongoose.model('Pacient', pacientSchema)

export async function createPacient(data) {
    return await (await model.create(data)).populate({
        path: 'user',
        select: '-password'
    });

}

export async function getPacientByNUS(nus) {
    return await model.findOne({ nus }).populate({
        path: 'user',
        select: '-password'
    });
}

export async function getPacientByUserId(userId) {
    return await model.findOne({ user: userId }).populate({
        path: 'user',
        select: '-password'
    });

}