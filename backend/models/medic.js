import mongoose from "mongoose";

const medicSchema = new mongoose.Schema({
    specialty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    disponibility: [{
        date: Date,
        hours: [{
            start: Date,
            end: Date
        }]
    }]
}, { timestamps: true })

const model = mongoose.model('Medic', medicSchema)

export async function createMedic(data) {
    if (!data.specialty) {
        return new Error("Os campos 'specialty' é obrigatório.");
    }
    return await model.create(data)
}

export async function getMedicById(ID) {
    if (!ID) {
        return new Error("O campo 'ID' é obrigatório para busca.");
    }
    return await model.findById(ID).populate({
        path: 'user',
        select: '-password'
    }).populate('specialty').exec();
}

export async function getMedicByUserId(ID) {
    if (!ID) {
        return new Error("O campo 'ID' é obrigatório para busca.");
    }
    return await model.findOne({user: ID}).populate({
        path: 'user',
        select: '-password'
    }).populate('specialty').exec();
}


export async function getMedicByEmail(email) {
    if (!email) {
        return new Error("O campo 'email' é obrigatório para busca.");
    }
    return await model.findOne({ email }).populate({
        path: 'user',
        select: '-password'
    }).populate('specialty').exec();
}