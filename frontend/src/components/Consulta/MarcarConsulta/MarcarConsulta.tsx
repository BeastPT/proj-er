import { Button, Paper, Stack, TextInput, Title, NativeSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from '@mantine/form';
import { Data, User } from '@/types/data.types';
import { useNavigate } from 'react-router-dom';
import Capitalize from '@/utils/Capitalize';

const BASE_URL = "http://localhost:3001/api/consultation/new";
const BASE_URL2 = "http://localhost:3001/api/medic/getall";

export function MarcarConsulta() {
    const [success, setSuccess] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Data[]>([]);
    const [availableHours, setAvailableHours] = useState<string[]>([]);
    const [availableDates, setAvailableDates] = useState<Date[]>([]);

    const navigate = useNavigate();

    // Move specialties calculation into a useMemo to prevent recalculation on every render
    const specialties = useMemo(() => {
        const uniqueSpecialties = [...new Set(data.map(item => item.specialty.specialty))].map(specialty => ({
            value: specialty,
            label: Capitalize(specialty)
        }));

        return [{ value: '', label: 'Selecione uma especialidade' }, ...uniqueSpecialties];
    }, [data]);

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

    // Separate user data fetching and API data fetching into different effects
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            navigate("/login");
            return;
        }

        try {
            const userDataParsed = JSON.parse(userData);
            setUser(userDataParsed?.user);
        } catch (error) {
            console.error("Error parsing user data:", error);
            navigate("/login");
        }
    }, [navigate]);

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

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array since this should only run once

    // Move getAvailableDoctors into a useMemo
    const availableDoctors = useMemo(() => {
        if (!form.values.specialty) return [];

        return data
            .filter(item => item.specialty.specialty === form.values.specialty)
            .map(item => ({
                label: item.user.fullname,
                value: item._id
            }));
    }, [data, form.values.specialty]);

    // Update available dates when doctor is selected
    useEffect(() => {
        if (!form.values.medic) {
            setAvailableDates([]);
            return;
        }

        const selectedDoctor = data.find(item => item._id === form.values.medic);
        if (!selectedDoctor) {
            setAvailableDates([]);
            return;
        }

        const dates = selectedDoctor.disponibility
            .filter(d => d.hours.some(hour => !hour.occupied))
            .map(d => new Date(d.date));

        setAvailableDates(dates);
    }, [form.values.medic, data]);

    // Update available hours when date and doctor are selected
    useEffect(() => {
        if (!form.values.date || !form.values.medic) {
            setAvailableHours([]);
            return;
        }

        const selectedDoctor = data.find(item => item._id === form.values.medic);
        if (!selectedDoctor) {
            setAvailableHours([]);
            return;
        }

        const selectedDate = form.values.date;
        const availability = selectedDoctor.disponibility.find(
            d => new Date(d.date).toDateString() === selectedDate.toDateString()
        );

        if (!availability) {
            setAvailableHours([]);
            return;
        }

        const hours = availability.hours
            .filter(hour => !hour.occupied)
            .map(hour => {
                const startTime = new Date(hour.start);
                return `${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`;
            });

        setAvailableHours(hours);
    }, [form.values.date, form.values.medic, data]);

    // Move shouldDisableDate into a useCallback
    const shouldDisableDate = useCallback((date: Date) => {
        if (!form.values.medic) return true;

        return !availableDates.some(
            availableDate => availableDate.toDateString() === date.toDateString()
        );
    }, [form.values.medic, availableDates]);

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
                    "authorization": user?.email ?? '',
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
            fetchData();

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
                        data={[{ value: '', label: 'Selecione um médico' }, ...availableDoctors]}
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