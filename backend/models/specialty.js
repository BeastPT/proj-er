import mongoose from "mongoose";

const specialtySchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    }
}, { timestamps: true })

const model = mongoose.model('Specialty', specialtySchema)