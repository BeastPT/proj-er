import { Button, Paper, Stack, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

export function HomePageMedico() {
    const navigate = useNavigate(); // Inicializa o hook de navegação

    return (
        <Paper p="xl">
            <Stack gap="xl" justify="flex-start">
                <div>
                    <Title order={2}>Mario Ferreira Cardoso</Title>
                    <Text size="xs">Especialidade: Cardiologia</Text>
                </div>

                <Button variant="filled" onClick={() => navigate('/InserirDisponibilidade')}>
                    Inserir Disponibilidade
                </Button>
                <Button variant="filled" onClick={() => navigate('/consulta/historico')}>
                    Consultar Histórico Pacientes
                </Button>
                <Button variant="filled" onClick={() => navigate('planotratamento')}>
                    Enviar Plano de Tratamento
                </Button>
            </Stack>
        </Paper>
    );
}
