import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text, NumberInput } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import classes from './Register.module.css';

export function Register() {
    const icon = <IconAt stroke={2} size={16} />
    const number = <Text size="xs">+351</Text>
    return (
        <Paper p='xl'>
            <Stack gap='xl' justify='flex-start'>
                <Title ta="center" order={1}>Complete os seus dados</Title>

                <TextInput
                    label="Nome Completo"
                    placeholder="Afonso Abreu"
                />

                <NumberInput
                    label="Número de Telemóvel"
                    placeholder="912 345 678"
                    leftSectionPointerEvents='none'
                    leftSection={number}
                    thousandSeparator=" "
                    min={900000000}
                    max={999999999}
                    hideControls
                />

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
                    <Button variant="light">Criar conta</Button>
                    <Text ta="center">
                        Já tem uma conta?{' '}
                        <Anchor<'a'> href="#" fw={700} onClick={(event) => event.preventDefault()}>
                            Clique aqui
                        </Anchor>
                    </Text>
                </Stack>
            </Stack>
        </Paper>
    );
}