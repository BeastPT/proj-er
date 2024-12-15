import { Button, Paper, Stack, Title, Text } from '@mantine/core';

export function HomePageMedico() {
    return (
        <Paper p="xl">
            <Stack gap="xl" justify="flex-start">
                <div>
                    <Title order={2}>Mario Ferreira Cardoso</Title>
                    <Text size="xs">Especialidade:</Text>
                </div>

                <Button component="a" href="/InserirDisponibilidade" variant="filled">
                    Inserir Disponibilidade
                </Button>
                <Button component="a" href="/consulta/historico" variant="filled">
                    Consultar Histórico Pacientes
                </Button>
                <Button component="a" href="/planoTratamento" variant="filled">
                    Enviar Plano Tratamento
                </Button>
            </Stack>
        </Paper>
    );
}
