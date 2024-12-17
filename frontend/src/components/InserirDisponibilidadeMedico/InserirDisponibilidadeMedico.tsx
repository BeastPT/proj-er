import { User } from '@/types/data.types';
import { Button, Paper, Stack, TextInput, Title, NativeSelect, Text } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:3001/api/medic/availability/add";

export function InserirDisponibilidadeMedico() {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const nav = useNavigate();

    // Memoize times array to prevent recreation on each render
    const times = useMemo(() => 
        Array.from({ length: 48 }, (_, i) => {
            const hour = Math.floor(i / 2);
            const minutes = i % 2 ? '30' : '00';
            const time = `${hour}:${minutes}`;


            return {
                label: time,
                value: ((hour * 60 + parseInt(minutes)) * 1000).toString(),
            };
        }),
        []
    );

    const form = useForm({
        initialValues: {
            date: null as Date | null,
            time: '',
        },
        validate: {
            date: (value) => (value ? null : "A data é obrigatória."),
            time: (value) => (value ? null : "A hora é obrigatória."),
        },
    });

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            nav("/medico/login");
            return;
        }

        try {
            const userDataParsed = JSON.parse(userData);
            setUser(userDataParsed);
        } catch (error) {
            console.error("Error parsing user data:", error);
            nav("/medico/login");
        }
    }, [nav]);

    const sendRequest = async (values: typeof form.values) => {
        if (!values.date) return;
        const date = new Date(values.date);
        date.setHours(0, 0, 0, 0);
        const newDate = new Date(date.getTime() + parseInt(values.time));

        try {
            const response = await fetch(BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": user?.email || "",
                },
                body: JSON.stringify({
                    timestamp: newDate
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                return setError(data.message);
            } else {
                setError(null);
                setSuccess("Disponibilidade inserida com sucesso!");
                form.reset();
            }
            
        } catch (err) {
            setError("Ocorreu um erro inesperado. Tente novamente.");
            console.error("Erro:", err);
        }
    };

    const handleSubmit = async (values: typeof form.values) => {
        setError(null);
        console.log('test')
        await sendRequest(values);
    };

    if (!user) {
        return null;
    }

    return (
        <Paper p='xl'>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap='xl' justify='flex-start'>
                    <Title ta="center" order={1}>Inserir Disponibilidade</Title>

                    <DatePickerInput
                        label="Data"
                        placeholder="Escolha uma data"
                        {...form.getInputProps('date')}
                        minDate={new Date()}
                        hideOutsideDates
                    />

                    <NativeSelect
                        label="Hora"
                        description="Insira a hora"
                        data={times}
                        {...form.getInputProps('time')}
                    />

                    {error && <Text ta="center" c="red">{error}</Text>}
                    {success && <Text ta="center" c="green">{success}</Text>}

                    <Button variant="light" type='submit'>
                        Inserir Disponibilidade
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}