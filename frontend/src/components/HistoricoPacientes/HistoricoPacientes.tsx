import { Paper, Stack, Title } from '@mantine/core';
import { ConsultaPaper } from '@/components/Consulta/ConsultaPaper/ConsultaPaper';
import { useEffect, useState } from 'react';
import { Consultation, User } from '@/types/data.types';
import { useNavigate } from 'react-router-dom';
import { PacientesPaper } from './PacientesPaper';

const BASE_URL = "http://localhost:3001/api/consultation/get";

export function HistoricoPacientes() {

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [pacientes, setPacientes] = useState<any[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            navigate("/login");
            return;
        }

        try {
            const userDataParsed = JSON.parse(userData);
            console.log(userDataParsed);
            setUser(userDataParsed);
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

                console.log(fetchedData);
                // transform fetchedData (consultations) to patients
                const uniquePacients = Array.from(
                    new Map(
                        fetchedData.map((item: any) => [
                            item.pacient._id, 
                            {
                                _id: item.pacient._id,
                                fullname: item.pacient.user.fullname
                            }
                        ])
                    ).values()
                );

                setPacientes(uniquePacients);
                console.log(pacientes)
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
            <Title ta="center" order={1}>Histórico de Pacientes</Title>

            <Stack gap='md' mt='md' justify='flex-start'>
                {
                    pacientes.map((consulta) =>
                        <PacientesPaper nome={consulta.fullname} id={consulta._id} key={consulta._id}/>
                    )
                }
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Stack>
        </Paper>
    );
}