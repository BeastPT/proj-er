import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema({
    specialty: {
        type: String,
        required: [true, "O campo 'specialty' é obrigatório."],
        unique: true,
        lowercase: true,
    }
}, { timestamps: true });

const model = mongoose.model('Specialty', specialtySchema);

export async function createSpecialty(data) {
    if (!data.specialty) {
        return new Error("O campo 'specialty' é obrigatório.");
    }
    return await model.create(data);
}

export async function getSpecialtyByName(specialty) {
    if (!specialty) {
        return new Error("O campo 'specialty' é obrigatório para busca.");
    }
    return await model.findOne({ specialty: specialty.toLowerCase() }).exec();
}

export async function getAllSpecialties() {
    return await model.find().exec();
}
