import { Button, Paper, Stack, Title, Text } from '@mantine/core';

export function Menu() {
    return (
        <Paper p="xl">
            <Stack gap="xl" justify="flex-start">
                <div>
                    <Title order={2}>Mario Ferreira Cardoso</Title>
                    <Text size="xs">Paciente desde 02/12/2024</Text>
                </div>
                <Button component="a" href="/consulta/marcar" variant="filled">
                    Marcar Consulta
                </Button>

                <Button component="a" href="/consulta/cancelar" variant="filled">
                    Cancelar Consulta
                </Button>

                <Button component="a" href="/consulta/exames" variant="filled">
                    Ver Exames
                </Button>

                <Button component="a" href="/consulta/notificacoes" variant="filled">
                    Notificações
                </Button>
            </Stack>
        </Paper>
    );
}

