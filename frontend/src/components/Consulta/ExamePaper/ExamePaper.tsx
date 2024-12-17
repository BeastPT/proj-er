import Capitalize from '@/utils/Capitalize';
import { Paper, Title, Text, useMantineColorScheme, Button } from '@mantine/core';
import dayjs from 'dayjs';

interface ExamePaperButtonProps {
    onClick: () => void;
    text: string;
    style?: React.CSSProperties;
    variant?: 'default' | 'light' | 'filled';
    color?: string;
}

interface ExamesPaperProps {
    status: 'por realizar' | 'realizada' | 'falhada' | 'cancelada';
    nome: string;
    urgencia: 'baixa' | 'normal' | 'alta';
    medico: string;
    timestamp: number;
    button?: ExamePaperButtonProps;
}

export function ExamePaper({ status, nome, urgencia, timestamp, medico, button }: ExamesPaperProps) {
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
                    <Title order={3}>{nome}  {status}</Title>
                    <Text size="sm" mt="md">
                        <strong>Urgência</strong>: {Capitalize(urgencia)}
                    </Text>
                    <Text size="sm">
                        <strong>Médico</strong>: {medico}
                    </Text>
                    <Text size="sm">
                        <strong>Data:</strong>: {dayjs(timestamp).format('DD-MM-YYYY  HH:mm')}
                    </Text>
                </div>
                {button && (
                    <Button
                        onClick={button.onClick}
                        style={button.style}
                        variant={button.variant}
                        color={button.color}
                        fullWidth
                        mt={16}
                    >
                        {button.text}
                    </Button>
                )}
        </Paper>
    );
}
