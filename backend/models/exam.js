import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
    },
    pacient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pacient',
        required: true,
    },
    medic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Medic',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['por realizar', 'realizada', 'falhada', 'cancelada'],
        default: 'por realizar',
    },
    urgency: {
        type: String,
        enum: ['baixa', 'normal', 'alta'],
        default: 'normal',
    },
    description: String,
}, { timestamps: true })

const model = mongoose.model('Exam', examSchema)


export async function createExam(data){
    return await model.create(data)
}

export async function getExamsFromPacient(pacient){
    return await model.find({ pacient: pacient }).populate({
        path: 'medic',
        select: 'user specialty',
        populate: [
            {
                path: 'user',
                select: 'fullname email'
            },
            {
                path: 'specialty',
                select: 'specialty'
            }
        ]
    }).exec();
}