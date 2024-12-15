import { Button, Paper, Stack, Title, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

export function Menu() {
    const navigate = useNavigate(); // Inicializa o hook de navegação

    return (
        <Paper p='xl'>
            <Stack gap='xl' justify='flex-start'>
                <div>
                    <Title order={2}>Mario Ferreira Cardoso</Title>
                    <Text size='xs'>Paciente desde 02/12/2024</Text>
                </div>
                <Button variant="filled" onClick={() => navigate('/consulta/marcar')}>
                    Marcar Consulta
                </Button> 

                <Button variant="filled" onClick={() => navigate('/consulta/cancelar')}> 
                    Cancelar Consulta
                </Button>

                <Button variant="filled" onClick={() => navigate('/consulta/exames')}>
                    Ver Exames
                </Button>

                <Button variant="filled" onClick={() => navigate('/consulta/notificacoes')}>
                    Notificações
                </Button>
            </Stack>
        </Paper>
        //falta criar as paginas
    );
}
