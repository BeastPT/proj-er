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

export async function addDisponibilityMedic(id, disponibility) {
    if (!id) {
        return new Error("O campo 'ID' é obrigatório para atualização.");
    }

    const alreadyexists = await getDisponibilityDate(id, disponibility.date)
    if (alreadyexists.length > 0) {
        return await model.findOneAndUpdate({
            _id: id,
            'disponibility.date': disponibility.date
        }, {
            $push: { 'disponibility.$.hours': { $each: disponibility.hours } }
        }, { new: true }).exec();
    } else {
        console.log('doesnt exist')
        return await model.findByIdAndUpdate(id, {
            $push: { disponibility }
        }, { new: true }).exec();
    }
}

export async function getDisponibility(ID) {
    if (!ID) {
        return new Error("O campo 'ID' é obrigatório para busca.");
    }
    
    return await model.findById(ID).select('disponibility').exec();
}

export async function getDisponibilityDate(id, date) {
    if (!id) {
        return new Error("O campo 'ID' é obrigatório para busca.");
    }
    if (!date || !(date instanceof Date)) {
        return new Error("O campo 'date' é obrigatório para busca.");
    }

    return await model.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        { $unwind: '$disponibility' },
        { $match: { 'disponibility.date': date } }
    ]).exec();
}