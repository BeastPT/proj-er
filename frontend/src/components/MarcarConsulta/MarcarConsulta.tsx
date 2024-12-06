import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text, NumberInput, Container, NativeSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

export function MarcarConsulta() {
    const [date, setDate] = useState<Date | null>(null);
    return (
        <Paper p='xl'>
            <Stack gap='xl' justify='flex-start'>
                <Title ta="center" order={1}>Marcar Consulta</Title>

                <TextInput
                    label="Nome Completo"
                    placeholder="Afonso Abreu"
                />

                <DatePickerInput
                    label="Data"
                    placeholder="Escolha uma data"
                    value={date}
                    onChange={setDate}
                    minDate={new Date()}
                    hideOutsideDates
                    excludeDate={(date) => date.getDay() === 6 || date.getDay() === 0} // editar para mostrar as datas disponiveis
                />

                <NativeSelect label="Hora" description="Insira a hora" data={['10:00', '10:30', '11:00']} />

                <NativeSelect label="Especialidade" description="Insira a especialidade" data={['Cardiologia', 'Urologia', 'Pediatria']} />

                <NativeSelect label="Médico Disponível" data={['Pedro da Mata', 'Roberto Antunes', 'Lígia Freitas']} />

                <Button variant="light">Marcar Consulta</Button>

            </Stack>
        </Paper>
    );
}