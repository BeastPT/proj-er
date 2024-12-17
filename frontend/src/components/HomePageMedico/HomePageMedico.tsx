import { User } from '@/types/data.types';
import Capitalize from '@/utils/Capitalize';
import { Button, Paper, Stack, Title, Text } from '@mantine/core';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePageMedico() {
    const navigate = useNavigate();
    const [medic, setMedic] = useState<any>(null);

    useEffect(() => {
        const medicData = localStorage.getItem("medic");
        if (!medicData) {
            navigate("/medico/login");
            return;
        }

        try {
            const dataParsed = JSON.parse(medicData);
            setMedic(dataParsed);
        } catch (error) {
            console.error("Error parsing user data:", error);
            navigate("/medico/login");
        }
    }, []);

    if (!medic) {
        return null;
    }
    
    return (
        <Paper p="xl">
            <Stack gap="xl" justify="flex-start">
                <div>
                    <Title order={2}>{medic.user.fullname}</Title>
                    <Text size="xs">Especialidade: {Capitalize(medic.specialty.specialty)}</Text>
                </div>

                <Button component="a" href="/InserirDisponibilidade" variant="filled">
                    Inserir Disponibilidade
                </Button>
                <Button component="a" href="/consulta/historico" variant="filled">
                    Consultar Histórico Pacientes
                </Button>
                <Button component="a" href="/planoTratamento" variant="filled">
                    Enviar Plano Tratamento
                </Button>
            </Stack>
        </Paper>
    );
}
