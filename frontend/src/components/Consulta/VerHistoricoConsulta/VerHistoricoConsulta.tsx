import { Paper, Stack, Title } from '@mantine/core';
import { ConsultaPaper } from '../ConsultaPaper/ConsultaPaper';
import { useEffect, useState } from 'react';
import { Consultation, User } from '@/types/data.types';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:3001/api/consultation/get";

export function VerHistoricoConsulta() {

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [consultas, setConsultas] = useState<Consultation[]>([]);

    const navigate = useNavigate();

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

    useEffect(() => {
        if (!user?.email) return;

        const fetchData = async () => {
            try {
                const response = await fetch(BASE_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": user?.email || "",
                    },
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    setError(errorData.error || "Erro");
                    console.log("Backend error:", errorData);
                    return;
                }
    
                const fetchedData = await response.json();
                setConsultas(fetchedData);
            } catch (err) {
                setError("Erro ao conectar ao servidor.");
                console.error("Fetch error:", err);
            }
        };

        fetchData();
    }, [user])

    if (!user) {
        return null;
    }


    return (
        <Paper p='xl'>
            <Title ta="center" order={1}>Histórico de Consultas</Title>

            <Stack gap='md' mt='md' justify='flex-start'>
                {
                    consultas.map((consulta) => {
                        const medic = consulta.medic
                        console.log(consulta);
                        return (
                            <ConsultaPaper status={consulta.status} especialidade={consulta.specialty.specialty} medico={medic.user.fullname} timestamp={new Date(consulta.timestamp).getTime()} key={consulta._id}/>
                        );
                    })
                }
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Stack>
        </Paper>
    );
}