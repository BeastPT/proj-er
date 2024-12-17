import Capitalize from '@/utils/Capitalize';
import { Paper, Title, Text, useMantineColorScheme, Button } from '@mantine/core';
import dayjs from 'dayjs';

interface ConsultaPaperButtonProps {
    onClick: () => void;
    text: string;
    style?: React.CSSProperties;
    variant?: 'default' | 'light' | 'filled';
    color?: string;
}

interface ConsultaPaperProps {
    status: 'por realizar' | 'realizada' | 'falhada' | 'cancelada';
    especialidade: string;
    medico: string;
    timestamp: number;
    button?: ConsultaPaperButtonProps;
}

export function ConsultaPaper({ status, especialidade, medico, timestamp, button }: ConsultaPaperProps) {
    const { colorScheme } = useMantineColorScheme();
    return (
        <Paper
            shadow="sm"
            radius="md"
            p="md"
            style={{
                backgroundColor: colorScheme === 'dark'
                    ? 'var(--mantine-color-dark-9)'
                    : 'var(--mantine-color-gray-2)',
            }}
        >
                <div>
                    <Title order={3}>Consulta {status}</Title>
                    <Text size="sm">{Capitalize(especialidade)}</Text>
                    <Text size="sm" mt="md">
                        <strong>Médico</strong>: {medico}
                    </Text>
                    <Text size="sm">
                        <strong>Data da Consulta</strong>: {dayjs(timestamp).format('DD-MM-YYYY  HH:mm')}
                    </Text>
                </div>
                {button && (
                    <Button
                        onClick={button.onClick}
                        style={button.style}
                        variant={button.variant}
                        color={button.color}
                        mt={16}
                    >
                        {button.text}
                    </Button>
                )}
        </Paper>
    );
}
