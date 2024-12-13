import mongoose from "mongoose";

const pacientSchema = new mongoose.Schema({
    birth_date: {
        type: Date,
        required: true,
    },
    nus: {
        type: Number,
        required: true,
        min: 100000000,
        max: 999999999,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

const model = mongoose.model('Pacient', pacientSchema)