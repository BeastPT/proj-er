import { Paper, Text, Title, useMantineColorScheme } from '@mantine/core';


export function PacientesPaper({ nome, id }: any) {
    const { colorScheme } = useMantineColorScheme();
    return (
        <Paper
            shadow="sm"
            radius="md"
            p="md"
            style={{
                backgroundColor: colorScheme === 'dark'
                    ? 'var(--mantine-color-blue-9)'
                    : 'var(--mantine-color-blue-2)',
            }}
        >
                <div>
                    <Title order={3}>{nome}</Title>
                    <Text size="sm" mt={-5}>
                        <strong>ID: </strong>: {id}
                    </Text>
                </div>
        </Paper>
    );
}
