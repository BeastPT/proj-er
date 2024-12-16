import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text, NumberInput, Code } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { hasLength, isInRange, useForm } from '@mantine/form';
import { useState } from 'react';

const BASE_URL = "http://localhost:3001/api/auth/register";

export function Register() {
    const icon = <IconAt stroke={2} size={16} />
    const number = <Text size="xs">+351</Text>

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            fullname: '',
            email: '',
            password: '',
            phone: '',
            nus: ''
        },
        validate: {
            fullname: (value) => (value.trim() ? null : "O nome completo é obrigatório"),
            email: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && 'O email deve ser válido',
            password: hasLength(
                { min: 10 }, 'A senha deve ter pelo menos 6 caracteres'),
            phone: isInRange({ min: 100000000, max: 999999999 }, 'O número de telemóvel deve ter 9 dígitos'),
            nus: isInRange({ min: 100000000, max: 999999999 }, 'O número de utente de saúde deve ter 9 dígitos'),
        }
    });
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: typeof form.values) => {
        setError(null)
        sendRequest();
    };


    const sendRequest = async () => {
        if (Object.keys(form.errors).length > 0) {
            return
        }
        console.log('continue')
        const vals = form.getValues();

        const user = await fetch(`${BASE_URL}`, { // Faz uma requisição na API para registrar um usuário
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vals), // Passa os dados do usuário
        });

        if (!user.ok) {
            setError((await user.json()).message) // Se der erro, lança um erro com a mensagem vinda da API
            return
        } else if (user.status === 201) {
            console.log(await user.json()) // RESPOSTA :D Conta registrada
        }

    }


    return (
        <Paper p='xl'>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap='md' justify='flex-start'>
                    <Title ta="center" order={1}>Complete os seus dados</Title>
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
                        hideControls
                    />

                    <NumberInput
                        {...form.getInputProps('nus')}
                        key={form.key('nus')}
                        label="Número de Utente de Saúde"
                        placeholder="000000000"
                        leftSectionPointerEvents='none'
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
                        <Button variant="light" type='submit'>Criar conta</Button>
                        <Text ta="center" c="red">{error}</Text>
                        <Text ta="center">
                            Já tem uma conta?{' '}
                            <Anchor href="/login" underline='hover' fw={700}>
                                Clique aqui
                            </Anchor>
                        </Text>
                    </Stack>
                </Stack>
            </form>
        </Paper>
    );
}