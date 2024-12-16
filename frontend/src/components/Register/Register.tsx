import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text, NumberInput, Code } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import classes from './Register.module.css';
import { useState } from 'react';

const BASE_URL = "http://localhost:3001/auth/register";

export function Register() {
    const icon = <IconAt stroke={2} size={16} />
    const number = <Text size="xs">+351</Text>

    console.log(BASE_URL)

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            fullname: '',
            email: '',
            password: '',
            phone: '',
        }
    });

    const [submittedValues, setSubmittedValues] = useState<typeof form.values | null>(null);

    const verifyValues = async () => {
        const vals = form.getValues();

        console.log(vals)
        const user = await fetch(`${BASE_URL}`, { // Faz uma requisição na API para registrar um usuário
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vals), // Passa os dados do usuário
        });

        console.log(user)
        if (!user.ok) {
            throw new Error((await user.json()).message) // Se der erro, lança um erro com a mensagem vinda da API
        }
    }


    return (
        <Paper p='xl'>
            <Stack gap='xl' justify='flex-start'>
                <Title ta="center" order={1}>Complete os seus dados</Title>
                <form onSubmit={form.onSubmit(setSubmittedValues)}>
                    <TextInput
                        {...form.getInputProps('fullname')}
                        key={form.key('fullname')}
                        label="Nome Completo"
                        placeholder="Afonso Abreu"
                    />

                    <NumberInput
                        {...form.getInputProps('phone')}
                        key={form.key('phone')}
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
                        {...form.getInputProps('email')}
                        key={form.key('email')}
                        leftSectionPointerEvents="none"
                        leftSection={icon}
                        label="Email"
                        placeholder="email@gmail.com"
                    />

                    <PasswordInput
                        {...form.getInputProps('password')}
                        key={form.key('password')}
                        label="Password"
                        placeholder="Coloque a sua senha"
                    />

                    <Stack gap='xs'>
                        <Button variant="light" type='submit' onClick={verifyValues}>Criar conta</Button>
                        <Text ta="center">
                            Já tem uma conta?{' '}
                            <Anchor href="/login" underline='hover' fw={700}>
                            Clique aqui
                            </Anchor>
                        </Text>
                    </Stack>

                    <Code block>{submittedValues ? JSON.stringify(submittedValues, null, 2) : '–'}</Code>
                </form>
            </Stack>
        </Paper>
    );
}