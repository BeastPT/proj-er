import { addDisponibilityMedic, getAllMedics, getDisponibility, getDisponibilityDate, getMedicById, getMedicByUserId } from "../models/medic.js";

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
                start: new Date(hours[i].start).setSeconds(0, 0),
                end: new Date(hours[i].end).setSeconds(0, 0),
                occupied: false
            })
        }
    } else if (typeof hours === 'number') {
        for (let i = 0; i < hours; i++) {
            disponibility.hours.push({
                start: new Date(timestamp + i*30*60*1000).setSeconds(0, 0),
                end: new Date(timestamp + (i+1)*30*60*1000).setSeconds(0, 0),
                occupied: false
            })
        }

    } else {
        disponibility.hours.push({
            start: new Date(timestamp),
            end: new Date(parseInt(timestamp) + 30*60*1000),
            occupied: false
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

export async function getAllData(req, res) {
    const medics = await getAllMedics();

    res.status(200).json(medics);
}

export async function getMedicByEmail(req, res) {
    if (!req.userId) {
        return res.status(401).json({ error: "Não autorizado." });
    }

    const medic = await getMedicByUserId(req.userId);
    if (!medic) {
        return res.status(400).json({ message: 'Não autorizado.' });
    }

    res.status(200).json(medic);
}