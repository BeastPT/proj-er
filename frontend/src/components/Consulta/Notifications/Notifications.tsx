import { Paper, Stack, Title, Text } from '@mantine/core';
import { ConsultaPaper } from '../ConsultaPaper/ConsultaPaper';

export function Notifications() {
    return (
        <Paper p='xl'>
            <Title ta="center" order={1}>Notificações</Title>

            <Stack gap='md' mt='md' justify='flex-start'>
                <ConsultaPaper status='por realizar' especialidade='Pediatria' medico='Pedro da Mata' timestamp={new Date().getTime()}/>
            </Stack>
        </Paper>
    );
}