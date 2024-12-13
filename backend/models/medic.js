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