import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

export function LoginMedico() {
    const icon = <IconAt stroke={2} size={16}/>
    return (
        <Paper p='xl'>
            <Stack gap='xl' justify='flex-start'>
                <Title ta="center" order={1}>Bem vindo à Online Clinic</Title>

                <TextInput
                    leftSectionPointerEvents="none"
                    leftSection={icon}
                    label="Email"
                    placeholder="email@gmail.com"
                />

                <PasswordInput
                    label="Password"
                    placeholder="Coloque a sua senha"
                />

                <Stack gap='xs'>
                    <Button variant="light">Login</Button>
                    <Text ta="center">
                        É um paciente?{' '}
                        <Anchor href="/login" underline='hover' fw={700}>
                            Voltar
                        </Anchor>
                    </Text>
                </Stack>
            </Stack>
        </Paper>
    );
}