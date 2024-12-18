import { Modal, Paper, Stack, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Consultation, User } from '@/types/data.types';
import { useNavigate } from 'react-router-dom';
import { ExamePaper } from '../ExamePaper/ExamePaper';
import { useDisclosure } from '@mantine/hooks';

const BASE_URL = "http://localhost:3001/api/exam/get";

export function VerExames() {

    const [opened, { open, close }] = useDisclosure(false);

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [exames, setExames] = useState<Consultation[]>([]);
    const [descriptionExam, setDescriptionExam] = useState<string | null>(null);

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
                setExames(fetchedData);
                if (fetchedData.length === 0) {
                    setError("Nenhum exame disponível.");
                }
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
        <>
            <Modal opened={opened} onClose={close} title="Relatório Médico">
                {descriptionExam ? descriptionExam : "Nenhum relatório médico disponível."}
            </Modal>

            <Paper p='xl'>
                <Title ta="center" order={1}>Visualizar Exames</Title>

                <Stack gap='md' mt='md' justify='flex-start'>
                    {
                        exames.map((consulta: any) => {
                            return (
                                <ExamePaper
                                    status={consulta.status}
                                    nome={consulta.name}
                                    urgencia={consulta.urgency}
                                    timestamp={consulta.timestamp}
                                    medico={consulta.medic.user.fullname}
                                    key={consulta._id}
                                    {...(consulta.status === "realizada") ? {
                                        button: {
                                            onClick: () => {console.log("Ver exame: ", consulta._id)
                                                setDescriptionExam(consulta.description)
                                                open()
                                            },
                                            text: "Ver Exame",
                                            variant: "light",
                                            color: "blue"
                                        }
                                    } : {
                                    }}
                                />
                            );
                        })
                    }
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </Stack>
            </Paper>
        </>
    );
}