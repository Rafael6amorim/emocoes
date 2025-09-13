import "./home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ onNavigate, onLogout, userType, userId, onNavigateToRegisterPsicologo, onNavigateToRegisterPaciente, onNavigateToPsychologists, onNavigateToPatients }) {
    const [showPatientPopup, setShowPatientPopup] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [psicologo, setPsicologo] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [loading, setLoading] = useState(false);

    // Buscar pacientes quando o popup é aberto
    useEffect(() => {
        if (showPatientPopup && userType === "psicologo") {
            fetchPacientes();
        }
    }, [showPatientPopup, userType]);

    const fetchPacientes = async () => {
        setLoading(true);
        try {
            const [resPsicologos, resPacientes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/listar/psicologos/"),
                axios.get("http://127.0.0.1:8000/api/listar/pacientes/"),
            ]);

            // Encontra o psicólogo do usuário logado
            const psicologoDoUsuario = resPsicologos.data.find(
                psicologo => psicologo.id_usuario === userId
            );


            if (psicologoDoUsuario) {
                // Filtra os pacientes usando o id_psicologo correto
                const pacientesDoPsicologo = resPacientes.data.filter(
                    paciente => paciente.id_psicologo === psicologoDoUsuario.id_psicologo
                );

                setPacientes(pacientesDoPsicologo);
            } else {
                setPacientes([]);
            }
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePlayButtonClick = () => {
        if (userType === "psicologo") {
            setShowPatientPopup(true);
        } else {
            onNavigate();
        }
    };

    const handlePatientSelect = (paciente) => {
        setSelectedPaciente(paciente);
    };

    const handleStartGame = () => {
        if (selectedPaciente) {
            // Você pode passar o paciente selecionado para o jogo se necessário
            onNavigate(selectedPaciente);
        }
    };

    const handleClosePopup = () => {
        setShowPatientPopup(false);
        setSelectedPaciente(null);
    };

    return (
        <div className="Home">
            <div className="container-home">
                <h1 className="title-home">Brincando de sentir</h1>
                <p className="p-home">
                    Este jogo é uma ferramenta terapêutica pensada para crianças.
                    De forma lúdica e segura, ele ajuda a expressar sentimentos,
                    fortalecer o vínculo com o terapeuta e trabalhar emoções difíceis
                    de serem verbalizadas, promovendo autoconhecimento e desenvolvimento emocional.
                </p>

                <div className="buttons">
                    {/* Botão para jogar - comportamento diferente para psicólogos */}
                    <button onClick={handlePlayButtonClick} className="button-home">
                        Vamos Brincar!
                    </button>

                    {/* Botão comum para todos os usuários */}
                    <button className="button-home">
                        Rever Consultas
                    </button>

                    {/* Botão exclusivo para psicólogos */}
                    {userType === "psicologo" && (
                        <button onClick={onNavigateToRegisterPaciente} className="button-home">
                            Cadastrar Paciente
                        </button>
                    )}
                    {userType === "psicologo" && (
                        <button onClick={onNavigateToPatients} className="button-home">
                            Pacientes
                        </button>
                    )}
                    {/* Botão exclusivo para clínicas */}
                    {userType === "clinica" && (
                        <button onClick={onNavigateToRegisterPsicologo} className="button-home">
                            Cadastrar Psicólogo
                        </button>
                    )}

                    {userType === "clinica" && (
                        <button onClick={() => onNavigateToPsychologists(userId)} className="button-home">
                            Psicólogos
                        </button>
                    )}

                    {/* Link de logout para todos os usuários */}
                    <a className="logout" onClick={onLogout}>
                        Logout
                    </a>
                </div>

                {/* Popup de seleção de paciente para psicólogos */}
                {showPatientPopup && userType === "psicologo" && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <div className="popup-header">
                                <h2>Selecionar Paciente</h2>
                                <button className="popup-close" onClick={handleClosePopup}>×</button>
                            </div>

                            <div className="popup-body">
                                {loading ? (
                                    <div className="loading-popup">Carregando pacientes...</div>

                                ) : pacientes.length > 0 ? (
                                    <div className="patients-list-popup">
                                        {pacientes.map(paciente => (
                                            <div
                                                key={paciente.id_paciente}
                                                className={`patient-item ${selectedPaciente?.id_paciente === paciente.id_paciente ? 'selected' : ''}`}
                                                onClick={() => handlePatientSelect(paciente)}
                                            >
                                                <div className="patient-info">
                                                    <h4>{paciente.nome}</h4>
                                                    <p>Idade: {paciente.idade || 'Não informada'}</p>
                                                    <p>Tratamento: {paciente.tipo_tratamento || 'Não especificado'}</p>
                                                </div>
                                                {selectedPaciente?.id_paciente === paciente.id_paciente && (
                                                    <div className="selected-check">✓</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-patients">
                                        <p>Nenhum paciente cadastrado.</p>
                                        <button
                                            onClick={onNavigateToRegisterPaciente}
                                            className="button-home"
                                        >
                                            Cadastrar Primeiro Paciente
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="popup-footer">
                                <button
                                    onClick={handleClosePopup}
                                    className="popup-button cancel"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleStartGame}
                                    className="popup-button confirm"
                                    disabled={!selectedPaciente}
                                >
                                    Iniciar Jogo
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}