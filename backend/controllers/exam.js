import { createExam, getExamsFromPacient } from "../models/exam.js";
import { getPacientByUserId } from "../models/pacient.js";

export async function getExams(req, res) {
    if (!req.userId) {
        return res.status(401).json({ error: "Não autorizado." });
    }

    const pacient = await getPacientByUserId(req.userId);
    if (!pacient) {
        return res.status(404).json({ error: "ERRO" });

    }
    const exams = await getExamsFromPacient(pacient._id);
    return res.status(200).json(exams);
}

export async function addExam(req, res) {
    const { pacientid, medicid, timestamp, name } = req.body;

    if (!pacientid || !medicid || !timestamp || !name) {
        return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    const exam = await createExam({
        name,
        medic: medicid,
        pacient: pacientid,
        timestamp: timestamp,
    });

    return res.status(201).json(exam);
}