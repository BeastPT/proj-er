import { Anchor, Button, Paper, PasswordInput, Stack, TextInput, Title, Text } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';

const BASE_URL = "http://localhost:3001/api/auth/login";

export function Login() {
  const icon = <IconAt stroke={2} size={16} />;

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
    try {
      const user = await fetch(`${BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const userData = await user.json();

      if (!user.ok) {
        setError(userData.message); 
        return;
      }

      console.log("Resposta da API:", userData);
    } catch (err) {
      setError("Ocorreu um erro inesperado. Tente novamente.");
      console.error("Erro:", err);
    }
  };

  return (
    <Paper p="xl">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xl" justify="flex-start">
          <Title ta="center" order={1}>
            Bem-vindo à Online Clinic
          </Title>

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

          <Stack gap="xs">
            <Button variant="light" type="submit">
              Login
            </Button>
            <Text ta="center">
              Não tem uma conta?{' '}
              <Anchor href="/register" underline="hover" fw={700}>
                Registe-se
              </Anchor>
            </Text>
          </Stack>

          <Stack gap="xs" mt={55}>
            <Title order={3} ta="center">
              Faz parte da equipa médica?
            </Title>
            <Button component="a" href="/medico/login" variant="filled">
              Sim, conectar
            </Button>
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
}
