import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconAt } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:3001/api/auth/medic/login";
const BASE_URL2 = "http://localhost:3001/api/medic/get";

export function LoginMedico() {
    const icon = <IconAt stroke={2} size={16} />
    const nav = useNavigate()
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'O email deve ser válido' : null,
            password: (value) =>
                value.trim() ? null : 'A senha é obrigatória',
        },
    });

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (values: typeof form.values) => {
        setError(null);
        await sendRequest(values);
    };

    const sendRequest = async (values: typeof form.values) => {
        localStorage.removeItem("user");
        localStorage.removeItem("medic");
        try {
            const user = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const userData = await user.json();
            console.log(userData)
            if (!user.ok) {
                setError(userData.message);
                return;
            } else {
                // Save user data to local storage
                localStorage.setItem("user", JSON.stringify(userData.user));
                const medic = await fetch(`${BASE_URL2}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": userData.user.email
                    }
                });

                const medicData = await medic.json();

                if (!medic.ok) {
                    setError(medicData.message);
                    localStorage.removeItem("user");
                    return nav("/login");
                } else {
                    console.log("Resposta da API:", medicData);
                    localStorage.setItem("medic", JSON.stringify(medicData));
                    nav("/HomePage");
                }
            }

        } catch (err) {
            setError("Ocorreu um erro inesperado. Tente novamente.");
            console.error("Erro:", err);
        }
    };

    return (
        <Paper p='xl'>
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap='xl' justify='flex-start'>
                    <Title ta="center" order={1}>Bem vindo à Online Clinic</Title>

                    <TextInput
                        {...form.getInputProps('email')}
                        leftSectionPointerEvents="none"
                        leftSection={icon}
                        label="Email"
                        placeholder="email@gmail.com"
                    />

                    <PasswordInput
                        {...form.getInputProps('password')}
                        label="Password"
                        placeholder="Coloque a sua senha"
                    />

                    {error && <Text ta="center" c="red">{error}</Text>}

                    <Stack gap='xs'>
                        <Button variant="light" type='submit'>Login</Button>
                        <Text ta="center">
                            É um paciente?{' '}
                            <Anchor href="/login" underline='hover' fw={700}>
                                Voltar
                            </Anchor>
                        </Text>
                    </Stack>
                </Stack>
            </form>
        </Paper>
    );
}