import { Paper, Stack, Title, Text } from '@mantine/core';
import { ConsultaPaper } from '../ConsultaPaper/ConsultaPaper';
import { User, Consultation } from '@/types/data.types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:3001/api/consultation/get";


export function CancelarConsulta() {

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
                const filteredData = fetchedData.filter((consulta: any) => consulta.status === "por realizar" && new Date(consulta.timestamp).getTime() > Date.now());
                setConsultas(filteredData);
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


    const handleCancel = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3001/api/consultation/cancel/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": user?.email || "",
                },
                body: JSON.stringify({
                    consultationid: id
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Erro");
                console.log("Backend error:", errorData);
                return;
            } else {
                setConsultas(consultas.filter(consulta => consulta._id !== id));
            }

        } catch (err) {
            setError("Erro ao conectar ao servidor.");
            console.error("Fetch error:", err);
        }
    }

    return (
        <Paper p='xl'>
            <Title ta="center" order={1}>Cancelar Consultas</Title>

            <Stack gap='md' mt='md' justify='flex-start'>
                {
                    consultas.map((consulta) => {
                        const medic = consulta.medic
                        console.log(consulta);
                        return (
                            <ConsultaPaper
                                status={consulta.status}
                                especialidade={consulta.specialty.specialty}
                                medico={medic.user.fullname}
                                timestamp={new Date(consulta.timestamp).getTime()}
                                key={consulta._id}
                                button={{
                                    text: "Cancelar Consulta",
                                    color: "red",
                                    variant: "light",
                                    onClick: () => {
                                        handleCancel(consulta._id);
                                    }
                                }}
                            />
                        );
                    })
                }
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Stack>
        </Paper>
    );
}