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
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'cancelled'],
        default: 'pending',
    },
    urgency: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low',
    },
    description: String,
}, { timestamps: true })

const model = mongoose.model('Consultation', consultationSchema)