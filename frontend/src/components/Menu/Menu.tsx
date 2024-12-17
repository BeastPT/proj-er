import { User } from '@/types/data.types';
import { Button, Paper, Stack, Title, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Menu() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            navigate("/login");
            return;
        }

        try {
            const userDataParsed = JSON.parse(userData);
            setUser(userDataParsed?.user);
        } catch (error) {
            console.error("Error parsing user data:", error);
            navigate("/login");
        }
    }, []);

    if (!user) {
        return null;
    }


    return (
        <Paper p="xl">
            <Stack gap="xl" justify="flex-start">
                <div>
                    <Title order={2}>{user.fullname}</Title>
                    <Text size="xs">Paciente desde {dayjs(user.createdAt).format('DD-MM-YYYY')}</Text>
                </div>
                <Button component="a" href="/consulta/marcar" variant="filled">
                    Marcar Consulta
                </Button>

                <Button component="a" href="/consulta/cancelar" variant="filled">
                    Cancelar Consulta
                </Button>

                <Button component="a" href="/consulta/exames" variant="filled">
                    Ver Exames
                </Button>

                <Button component="a" href="/consulta/notifications" variant="filled">
                    Notificações
                </Button>
            </Stack>
        </Paper>
    );
}

