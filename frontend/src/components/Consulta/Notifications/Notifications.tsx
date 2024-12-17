import { Paper, Stack, Title, Text } from '@mantine/core';
import { ConsultaPaper } from '../ConsultaPaper/ConsultaPaper';
import { User, Consultation } from '@/types/data.types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = "http://localhost:3001/api/consultation/get";

export function Notifications() {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [consultas, setConsultas] = useState<Consultation[]>([]);
    const [selectedConsultas, setSelectedConsultas] = useState<string[]>([]);

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
    }, [user]);

    const toggleSelection = (id: string) => {
        setSelectedConsultas((prev) =>
            prev.includes(id) ? prev.filter((selected) => selected !== id) : [...prev, id]
        );
    };

    if (!user) {
        return null;
    }

    return (
        <Paper p='xl'>
            <Title ta="center" order={1}>Notificações de Consultas</Title>

            <Stack gap='md' mt='md' justify='flex-start'>
                {consultas.map((consulta) => {
                    const medic = consulta.medic;
                    const isSelected = selectedConsultas.includes(consulta._id);

                    return (
                        <div key={consulta._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelection(consulta._id)}
                            />
                            <ConsultaPaper
                                status={consulta.status}
                                especialidade={consulta.specialty.specialty}
                                medico={medic.user.fullname}
                                timestamp={new Date(consulta.timestamp).getTime()}
                            />
                        </div>
                    );
                })}
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </Stack>
        </Paper>
    );
}
