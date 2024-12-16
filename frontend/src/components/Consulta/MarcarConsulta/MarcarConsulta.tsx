import { Button, Paper, Stack, TextInput, Title, NativeSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import { useForm } from '@mantine/form';

const BASE_URL = "http://localhost:3001/api/consultation/newConsultation";

export function MarcarConsulta() {
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const form = useForm({
        initialValues: {
            fullname: '',
            date: null,
            time: '',
            specialty: '',
            medic: '',
        },
        validate: {
            fullname: (value) => (value.trim() ? null : "O nome completo é obrigatório."),
            date: (value) => (value ? null : "A data é obrigatória."),
            time: (value) => (value ? null : "A hora é obrigatória."),
            specialty: (value) => (value.trim() ? null : "A especialidade é obrigatória."),
            medic: (value) => (value ? null : "O médico é obrigatório."),
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        setError(null); 
        const validation = form.validate();
    
        if (validation.hasErrors) {
            console.log("Validation errors:", validation.errors); 
            return;
        }
        sendRequest(form.values);
    };
    
    const sendRequest = async (vals: typeof form.values) => {
        const { fullname, date, time, medic } = vals;
    
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
                    "Authorization": `Bearer ${localStorage.getItem('token') || ''}`,
                },
                body: JSON.stringify({
                    fullname,
                    medicid: medic,
                    date: formattedDate.toISOString(),
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
        } catch (err) {
            setError("Erro ao conectar ao servidor.");
            console.error("Fetch error:", err); 
        }
    };

    return (
        <Paper p="xl">
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Stack gap="xl" justify="flex-start">
                    <Title ta="center" order={1}>Marcar Consulta</Title>
    
                    <TextInput
                        label="Nome Completo"
                        placeholder="Afonso Abreu"
                        {...form.getInputProps('fullname')}
                    />
    
                    <DatePickerInput
                        label="Data"
                        placeholder="Escolha uma data"
                        {...form.getInputProps('date')}
                        minDate={new Date()}
                        hideOutsideDates
                        excludeDate={(date) => date.getDay() === 6 || date.getDay() === 0} // Exclui fins de semana
                    />
    
                    <NativeSelect
                        label="Hora"
                        description="Insira a hora"
                        data={['10:00', '10:30', '11:00']}
                        {...form.getInputProps('time')}
                    />
    
                    <NativeSelect
                        label="Especialidade"
                        description="Insira a especialidade"
                        data={['Cardiologia', 'Urologia', 'Pediatria']}
                        {...form.getInputProps('specialty')}
                    />
    
                    <NativeSelect
                        label="Médico Disponível"
                        data={[
                            { label: 'Pedro da Mata', value: '1' },
                            { label: 'Roberto Antunes', value: '2' },
                            { label: 'Lígia Freitas', value: '3' },
                        ]}
                        {...form.getInputProps('medic')}
                    />
    
                    <Button variant="light" type="submit">
                        Marcar Consulta
                    </Button>
                </Stack>
            </form>
        </Paper>
    );
}
