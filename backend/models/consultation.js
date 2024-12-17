import mongoose from "mongoose";

const consultationSchema = new mongoose.Schema({
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
    specialty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialty',
        required: true,
    },
    status: {
        type: String,
        enum: ['por realizar', 'realizada', 'falhada', 'cancelada'],
        default: 'por realizar',
    },
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    description: String,
}, { timestamps: true })

const model = mongoose.model('Consultation', consultationSchema)

export async function createConsultation(data){
    return await model.create(data)
}

export async function getConsultationsFromPacient(pacient){
    return await model.find({ pacient: pacient }).populate({
        path: 'medic',
        populate: {
            path: 'user',
            select: 'fullname email' // por exemplo
        }
    }).populate({
        path: 'specialty',
        select: 'specialty'
    }).exec();
}

export async function getConsultationsFromMedic(medic){
    return await model.find({ medic: medic }).populate({
        path: 'pacient',
        populate: {
            path: 'user',
            select: 'fullname email'
        }
    }).populate({
        path: 'specialty',
        select: 'specialty'
    }).exec();
}

export async function getConsultationAndCancel(id){
    return await model.findOneAndUpdate({ _id: id }, { status: 'cancelada' }, { new: true }).exec();
}