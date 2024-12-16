import { Paper, Stack, Title } from '@mantine/core';
import { ConsultaPaper } from '../ConsultaPaper/ConsultaPaper';

export function VerHistoricoConsulta() {
    return (
        <Paper p='xl'>
            <Title ta="center" order={1}>Histórico de Consultas</Title>

            <Stack gap='md' mt='md' justify='flex-start'>
                <ConsultaPaper status='por realizar' especialidade='Pediatria' medico='Pedro da Mata' timestamp={new Date().getTime()}
                button={{ onClick: () => console.log('oi'), text: 'Marcar Consulta' }} />
            </Stack>
        </Paper>
    );
}