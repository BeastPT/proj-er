import { createSpecialty, getSpecialtyByName } from "../models/specialty.js"

export async function addSpecialty(req, res) {
    const { specialty } = req.body
    if (!specialty) {
        return res.status(400).json({ message: 'Missing required fields' })
    }

    // verify if specialty is an array and add each specialty
    if (Array.isArray(specialty)) {
        let errors = []
        for (let i = 0; i < specialty.length; i++) {
            const spec = await getSpecialtyByName(specialty[i])
            if (spec) {
                errors.push({ message: `Specialty ${specialty[i]} already exists` })
            } else {
                const newSpec = await createSpecialty({ specialty: specialty[i] })
                if (newSpec instanceof Error) {
                    errors.push({ message: newSpec.message })
                }
            }
        }
        if (errors.length > 0) {
            return res.status(400).json(errors)
        }
        return res.status(200).json({ message: 'Specialties added successfully' })
    }


    const spec = await getSpecialtyByName(specialty)
    if (spec) {
        return res.status(400).json({ message: 'Specialty already exists' })
    }

    const newSpec = await createSpecialty({ specialty })
    if (newSpec instanceof Error) {
        return res.status(400).json({ message: newSpec.message })
    }

    res.status(200).json(newSpec)
}