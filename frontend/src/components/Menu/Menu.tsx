import { Button, Paper, Stack, Title, Text } from '@mantine/core';

export function Menu() {
    return (
        <Paper p='xl'>
            <Stack gap='xl' justify='flex-start'>
                <div>
                    <Title order={2}>Mario Ferreira Cardoso</Title>
                    <Text size='xs'>Paciente desde 02/12/2024</Text>
                </div>

                <Button variant="filled">Marcar Consulta</Button>
                <Button variant="filled">Cancelar Consulta</Button>
                <Button variant="filled">Ver Exames</Button>
                <Button variant="filled">Notificações</Button>
            </Stack>
        </Paper>
    );
}