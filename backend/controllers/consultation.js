import { createConsultation, getConsultationsFromMedic, getConsultationsFromPacient } from "../models/consultation.js";
import { getMedicById, getMedicByUserId, updateHourOccupied } from "../models/medic.js";
import { getPacientByUserId } from "../models/pacient.js";

export async function newConsultation(req, res) {
    const { medicid, date } = req.body;

    if (!req.userId) {
        return res.status(401).json({ error: "Não autorizado." });
    }


    if (!medicid || !date) {
        return res.status(400).json({ error: "Os campos 'medicid' e 'date' são obrigatórios." });
    }

    if (new Date(date) < new Date()) {
        return res.status(400).json({ error: "A data da consulta deve ser futura." });
    }

    const medic = await getMedicById(medicid);
    if (!medic) {
        return res.status(404).json({ error: "Médico não encontrado." });
    }

    const patient = await getPacientByUserId(req.userId);
    if (!patient) {
        return res.status(404).json({ error: "Paciente não encontrado." });
    }

    const consultation = await createConsultation({
        medic: medicid,
        pacient: patient._id,
        specialty: medic.specialty._id,
        timestamp: date,
    });

    await updateHourOccupied(medicid, date)

    return res.status(201).json(consultation);
}

export async function getConsultations(req, res) {
    if (!req.userId) {
        return res.status(401).json({ error: "Não autorizado." });
    }

    const pacient = await getPacientByUserId(req.userId);
    if (pacient) {
        const consultations = await getConsultationsFromPacient(pacient._id);
        return res.status(200).json(consultations);

    } else {
        const medic = await getMedicByUserId(req.userId);
        if (!medic) {
            return res.status(404).json({ error: "ERRO" });
        }

        const consultations = await getConsultationsFromMedic(medic._id);
        return res.status(200).json(consultations);
    }
}