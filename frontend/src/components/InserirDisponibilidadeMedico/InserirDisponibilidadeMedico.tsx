import { Button, Paper, Stack, TextInput, Title, NativeSelect } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

export function InserirDisponibilidadeMedico() {
    const [date, setDate] = useState<Date | null>(null);
    return (
        <Paper p='xl'>
            <Stack gap='xl' justify='flex-start'>
                <Title ta="center" order={1}>Inserir Disponibilidade</Title>

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

                <Button variant="light">Inserir Disponibilidade</Button>

            </Stack>
        </Paper>
    );
}