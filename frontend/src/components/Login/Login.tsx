import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

export function Login() {
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
                        Não tem uma conta?{' '}
                        <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
                            Registe-se
                        </Anchor>
                    </Text>
                </Stack>

                <Stack gap='xs' mt={55}>
                    <Title order={3} ta="center">
                        Faz parte da equipa médica?
                    </Title>
                    <Button variant="filled">Sim, conectar</Button>
                </Stack>
            </Stack>
        </Paper>
    );
}