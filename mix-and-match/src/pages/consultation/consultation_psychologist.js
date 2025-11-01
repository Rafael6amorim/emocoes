import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../../service/api_service';
import "./consultation_psychologist.css";

export default function Consultationpsychologist({ onNavigateBack, userId }) {
    console.log(userId);
    
    const [psicologos, setPsicologos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [clinica, setClinica] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedPsicologo, setSelectedPsicologo] = useState(null);
    const assetsPath = process.env.PUBLIC_URL + "/assets/user";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

                // Monte os params para filtrar por clínica
                const params = {};
                if (usuario?.tipo_usuario === 'clinica') {
                    params.tipo_usuario = 'clinica';
                    if (usuario.id_clinica) {
                        params.id_clinica = usuario.id_clinica;
                    } else if (usuario.email) {
                        params.usuario_email = usuario.email;
                    }
                }

                const [resPsicologos, resPacientes, resClinica] = await Promise.all([
                    axios.get(`${API_URL}/listar/psicologos/`, { params }),
                    axios.get(`${API_URL}/listar/pacientes/`),
                    axios.get(`${API_URL}/listar/clinicas/`),
                ]);

                setPsicologos(resPsicologos.data);
                setPacientes(resPacientes.data);
                setClinica(resClinica.data);
            } catch (err) {
                setError("Erro ao buscar dados.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Obter pacientes do psicólogo selecionado
    const pacientesDoPsicologo = selectedPsicologo
        ? pacientes.filter(paciente => paciente.id_psicologo === selectedPsicologo.id_psicologo)
        : [];

    // Calcular psicólogos com pacientes
    const psicologosComPacientes = psicologos.map(psicologo => {
        const qt_pacientes = pacientes.filter(paciente =>
            paciente.id_psicologo === psicologo.id_psicologo
        ).length;

        return {
            ...psicologo,
            qt_pacientes
        };
    });
    console.log(userId);
    
    const nomeClinica = clinica.find(clinica => clinica.id_usuario === userId)?.nome_clinica;
    console.log(clinica, "teste nome");
    

    const handleCardClick = (psicologo) => {
        setSelectedPsicologo(psicologo);
    };

    const closeModal = () => {
        setSelectedPsicologo(null);
    };

    if (loading) {
        return <div className="loading">Carregando dados...</div>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div className="consultation-container">

            <h1 className="">{nomeClinica}</h1>
            <h2>Psicólogos Ativos</h2>

            <div className="cards-list">
                {psicologosComPacientes.map((psicologo) => (
                    <div
                        className="card"
                        key={psicologo.id_psicologo}
                        onClick={() => handleCardClick(psicologo)}
                    >
                        <div className="card-left">
                            <img
                                src={psicologo.foto || `${assetsPath}/image.png`}
                                alt={psicologo.nome_psicologo}
                                className="avatar"
                                onError={(e) => {
                                    e.target.src = `${assetsPath}/image.png`;
                                }}
                            />
                            <div>
                                <h3>{psicologo.nome_psicologo}</h3>
                                <p>@{psicologo.email || psicologo.nome_psicologo.toLowerCase()}</p>
                            </div>
                        </div>
                        <div className="card-right">
                            <p>
                                <strong>Especialidade:</strong> {psicologo.abordagem}
                            </p>
                            <p>
                                <strong>Pacientes:</strong> {psicologo.qt_pacientes}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={onNavigateBack} className="back-button">
                Voltar
            </button>

            {/* Modal de pacientes */}
            {selectedPsicologo && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Pacientes de {selectedPsicologo.nome_psicologo}</h3>
                            <button className="close-button" onClick={closeModal}>×</button>
                        </div>

                        <div className="pacientes-list">
                            {pacientesDoPsicologo.length > 0 ? (
                                pacientesDoPsicologo.map(paciente => (
                                    <div key={paciente.id_paciente} className="paciente-card">
                                        <div className="paciente-info">
                                            <h4>{paciente.nome}</h4>
                                            <div className="paciente-details">
                                                <span className="idade">Idade: {paciente.idade || 'Não informada'}</span>
                                                <span className="tratamento">{paciente.tipo_tratamento || 'Sem tratamento específico'}</span>
                                            </div>
                                        </div>
                                        <div className="paciente-status">
                                            <div className="status-indicator"></div>
                                            <span>Em tratamento</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="empty-pacientes">
                                    <p>Nenhum paciente associado a este psicólogo</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}