import { Paper, Title, Text } from '@mantine/core';
import dayjs from 'dayjs';

interface ConsultaPaperProps {
    status: 'concluida' | 'por realizar' | 'cancelada';
    especialidade: string;
    medico: string;
    timestamp: number;
}

export function ConsultaPaper({status, especialidade, medico, timestamp}: ConsultaPaperProps) {
    return (
        <Paper shadow='sm' radius='md' p='md' style={{ backgroundColor: 'var(--mantine-color-dark-9)' }}>
            <Title order={3}>Consulta {status}</Title>
            <Text size='sm'>{especialidade}</Text>
            <Text size='sm' mt='md'><strong>Médico</strong>: {medico}</Text>
            <Text size='sm'><strong>Data da Consulta</strong>: {dayjs(timestamp).format("DD-MM-YYYY  HH:mm")}</Text>
        </Paper>
    );
}