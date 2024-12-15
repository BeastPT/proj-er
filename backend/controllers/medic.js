import { addDisponibilityMedic, getDisponibility, getDisponibilityDate, getMedicById, getMedicByUserId } from "../models/medic.js";

export async function addDisponibility(req, res) {
    const { timestamp, hours } = req.body

    if (!req.userId) {
        return res.status(401).json({ error: "Não autorizado." });
    }

    const medic = await getMedicByUserId(req.userId);
    if (!medic) {
        return res.status(400).json({ message: 'Não autorizado.' });
    }

    if (!timestamp) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const date = new Date(timestamp);
    date.setHours(0, 0, 0, 0);


    const disponibility = {
        date: date,
        hours: []
    }

    if (hours && Array.isArray(hours)) {
        for (let i = 0; i < hours.length; i++) {
            disponibility.hours.push({
                start: new Date(hours[i].start),
                end: new Date(hours[i].end)
            })
        }
    } else if (typeof hours === 'number') {
        disponibility.hours.push({
            start: new Date(timestamp),
            end: new Date(timestamp + hours*60*60*1000)
        })
    } else {
        disponibility.hours.push({
            start: new Date(timestamp),
            end: new Date(timestamp + 60*60*1000)
        })
    }

    const newMedic = await addDisponibilityMedic(medic._id, disponibility);

    if (newMedic instanceof Error) {
        return res.status(400).json({ message: newMedic.message });
    }

    res.status(200).json(newMedic);
}

export async function getDisponibilityController(req, res) {
    const { medicid, date } = req.body

    if (!req.userId) {
        return res.status(401).json({ error: "Não autorizado." });
    }

    if (!medicid ) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const medic = await getMedicById(medicid);
    if (!medic) {
        return res.status(400).json({ message: 'Medico incorreto!' });
    }

    let result;
    if (!date) {
        result = await getDisponibility(medicid)
        console.log(result)
    } else {
        let newdate = new Date(date);
        newdate.setHours(0, 0, 0, 0);
        result = await getDisponibilityDate(medicid, newdate)
    }

    if (!result) {
        return res.status(400).json({ message: 'Erro ao buscar disponibilidade!' });
    }

    if (result instanceof Error) {
        return res.status(400).json({ message: result.message });
    }

    res.status(200).json(result);
}