import { Button, Paper, Stack, TextInput, Title, NativeSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';

const BASE_URL = "http://localhost:3001/api/consultation/new";
const BASE_URL2 = "http://localhost:3001/api/medic/getall";

interface Specialty {
    _id: string;
    specialty: string;
}

interface User {
    _id: string;
    fullname: string;
}

interface Hour {
    start: Date;
    end: Date;
    occupied: boolean;
    _id: string;
}

interface Disponibility {
    date: Date;
    hours: Hour[];
    _id: string;
}

interface Data {
    _id: string;
    specialty: Specialty;
    user: User;
    disponibility: Disponibility[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function MarcarConsulta() {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Data[]>([]);
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);
    
    // Get unique specialties from data and format for NativeSelect
    const specialties = [...new Set(data.map(item => item.specialty.specialty))].map(specialty => ({
        value: specialty,
        label: capitalizeFirstLetter(specialty)
    }));

    // add to specialties array "Selecione uma especialidade"
    specialties.unshift({ value: '', label: 'Selecione uma especialidade' });
    
    const form = useForm({
        initialValues: {
            date: null as Date | null,
            time: '',
            specialty: '',
            medic: '',
        },
        validate: {
            date: (value) => (value ? null : "A data é obrigatória."),
            time: (value) => (value ? null : "A hora é obrigatória."),
            specialty: (value) => (value.trim() ? null : "A especialidade é obrigatória."),
            medic: (value) => (value ? null : "O médico é obrigatório."),
        },
    });

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(BASE_URL2, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": "admin",
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error || "Erro ao buscar médicos.");
                    console.log("Backend error:", errorData);
                    return;
                }

                const fetchedData = await response.json();
                setData(fetchedData);
            } catch (err) {
                setError("Erro ao conectar ao servidor.");
                console.error("Fetch error:", err);
            }
        };
        
        fetchData();
    }, []);

    // Get available doctors based on selected specialty
    const getAvailableDoctors = () => {
        if (!form.values.specialty) return [];
        
        return data
            .filter(item => item.specialty.specialty === form.values.specialty)
            .map(item => ({
                label: item.user.fullname,
                value: item._id
            }))
    };

    // Update available hours when date and doctor are selected
    useEffect(() => {
        if (form.values.medic) {
            const selectedDoctor = data.find(item => item._id === form.values.medic);
            if (selectedDoctor) {
                // Get all available dates from doctor's disponibility
                const dates = selectedDoctor.disponibility
                    .filter(d => {
                        // Check if there are any non-occupied hours in this date
                        return d.hours.some(hour => !hour.occupied);
                    })
                    .map(d => new Date(d.date));
                setAvailableDates(dates);
            } else {
                setAvailableDates([]);
            }
        } else {
            setAvailableDates([]);
        }
    }, [form.values.medic, data]);

    useEffect(() => {
        if (form.values.date && form.values.medic) {
            const selectedDoctor = data.find(item => item._id === form.values.medic);
            if (selectedDoctor) {
                const selectedDate = form.values.date;
                const availability = selectedDoctor.disponibility.find(
                    d => new Date(d.date).toDateString() === selectedDate.toDateString()
                );

                if (availability) {
                    const hours = availability.hours
                        .filter(hour => !hour.occupied)
                        .map(hour => {
                            const startTime = new Date(hour.start);
                            return `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
                        });
                    setAvailableHours(hours);
                } else {
                    setAvailableHours([]);
                }
            }
        }
    }, [form.values.date, form.values.medic, data]);

    const shouldDisableDate = (date: Date) => {        
        // If no doctor is selected, disable all dates
        if (!form.values.medic) return true;
        
        // Check if the date is in availableDates
        return !availableDates.some(
            availableDate => availableDate.toDateString() === date.toDateString()
        );
    };

    const handleSubmit = async (values: typeof form.values) => {
        setError(null);
        const validation = form.validate();

        if (validation.hasErrors) {
            console.log("Validation errors:", validation.errors);
            return;
        }
        
        const { date, time, medic } = values;

        if (!date) {
            setError("Data inválida.");
            return;
        }

        const formattedDate = new Date(date);
        if (time) {
            const [hours, minutes] = time.split(":").map(Number);
            formattedDate.setHours(hours, minutes, 0, 0);
        }

        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `development`,
                },
                body: JSON.stringify({
                    medicid: medic,
                    date: formattedDate,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Erro ao marcar consulta.");
                console.log("Backend error:", errorData);
                return;
            }

            const consultation = await response.json();
            setSuccess("Consulta marcada com sucesso!");
            setError(null);
            console.log("Consulta criada:", consultation);
            form.reset();


        } catch (err) {
            setError("Erro ao conectar ao servidor.");
            console.error("Fetch error:", err);
        }
    };

    return (
        <Paper p="xl">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="xl" justify="flex-start">
                    <Title ta="center" order={1}>Marcar Consulta</Title>

                    <NativeSelect
                        label="Especialidade"
                        description="Selecione a especialidade"
                        data={specialties}
                        {...form.getInputProps('specialty')}
                        onChange={(event) => {
                            form.setFieldValue('specialty', event.currentTarget.value);
                            form.setFieldValue('medic', '');
                            form.setFieldValue('date', null);
                            form.setFieldValue('time', '');
                            setAvailableHours([]);
                            setAvailableDates([]);
                        }}
                    />

                    <NativeSelect
                        label="Médico Disponível"
                        description="Selecione o médico"
                        data={[{ value: '', label: 'Selecione um médico' }, ...getAvailableDoctors()]}
                        {...form.getInputProps('medic')}
                        disabled={!form.values.specialty}
                        onChange={(event) => {
                            form.setFieldValue('medic', event.currentTarget.value);
                            form.setFieldValue('date', null);
                            form.setFieldValue('time', '');
                            setAvailableHours([]);
                        }}
                    />

                    <DatePickerInput
                        label="Data"
                        placeholder="Escolha uma data"
                        {...form.getInputProps('date')}
                        minDate={new Date()}
                        hideOutsideDates
                        allowDeselect
                        clearable
                        disabled={!form.values.medic}
                        onChange={(date) => {
                            form.setFieldValue('date', date);
                            form.setFieldValue('time', '');
                        }}
                        excludeDate={shouldDisableDate}
                    />

                    <NativeSelect
                        label="Hora"
                        description="Selecione o horário"
                        data={[{ value: '', label: 'Selecione um horário' }, ...availableHours.map(hour => ({
                            value: hour,
                            label: hour
                        }))]}
                        {...form.getInputProps('time')}
                        disabled={!form.values.date || availableHours.length === 0}
                    />

                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {success && <div style={{ color: 'green' }}>{success}</div>}

                    <Button variant="light" type="submit">
                        Marcar Consulta
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}