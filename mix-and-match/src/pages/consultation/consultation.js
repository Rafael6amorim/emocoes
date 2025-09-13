// pages/consultation/consultation_patients.js
import { useEffect, useState } from "react";
import axios from "axios";
import "./consultation.css";

export default function ConsultationPatients({ onNavigateBack, userId }) {
    console.log("User ID:", userId);
    
    const [psicologo, setPsicologo] = useState(null);
    const [pacientes, setPacientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const assetsPath = process.env.PUBLIC_URL + "/assets/user";

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Primeiro busca o psicólogo pelo userId
                const resPsicologos = await axios.get("http://127.0.0.1:8000/api/listar/psicologos/");
                console.log(resPsicologos);
                
                const psicologoEncontrado = resPsicologos.data.find(p => p.id_usuario === userId);
                
                if (psicologoEncontrado) {
                    setPsicologo(psicologoEncontrado);
                    
                    // Agora busca todos os pacientes
                    const resPacientes = await axios.get("http://127.0.0.1:8000/api/listar/pacientes/");
                    
                    // Filtra apenas os pacientes deste psicólogo
                    const pacientesDoPsicologo = resPacientes.data.filter(
                        paciente => paciente.id_psicologo === psicologoEncontrado.id_psicologo
                    );
                    
                    setPacientes(pacientesDoPsicologo);
                } else {
                    setError("Psicólogo não encontrado.");
                }
            } catch (err) {
                setError("Erro ao buscar dados.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) {
        return <div className="loading">Carregando dados...</div>;
    }

    if (error) {
        return (
            <div className="consultation-container">
                <button onClick={onNavigateBack} className="back-button">
                    Voltar
                </button>
                <p className="error">{error}</p>
            </div>
        );
    }

    if (!psicologo) {
        return (
            <div className="consultation-container">
                <button onClick={onNavigateBack} className="back-button">
                    Voltar
                </button>
                <p className="error">Psicólogo não encontrado.</p>
            </div>
        );
    }

    return (
        <div className="consultation-container">
            <button onClick={onNavigateBack} className="back-button">
                Voltar
            </button>
            
            <div className="psychologist-header">
                <img
                    src={psicologo.foto || `${assetsPath}/image.png`}
                    alt={psicologo.nome_psicologo}
                    className="psychologist-avatar"
                    onError={(e) => {
                        e.target.src = `${assetsPath}/image.png`;
                    }}
                />
                <div className="psychologist-info">
                    <h1>{psicologo.nome_psicologo}</h1>
                    <p className="psychologist-email">@{psicologo.email || psicologo.nome_psicologo.toLowerCase()}</p>
                    <p className="psychologist-specialty">{psicologo.abordagem}</p>
                </div>
            </div>

            <div className="patients-section">
                <h2>Pacientes Ativos</h2>
                <p className="patients-count">{pacientes.length} paciente(s) em tratamento</p>
                
                <div className="patients-list">
                    {pacientes.length > 0 ? (
                        pacientes.map(paciente => (
                            <div key={paciente.id_paciente} className="patient-card">
                                <div className="patient-main-info">
                                    <h3>{paciente.nome}</h3>
                                    <div className="patient-details">
                                        <span className="patient-age">Idade: {paciente.idade || 'Não informada'}</span>
                                        <span className="patient-treatment">
                                            {paciente.tipo_tratamento || 'Sem tratamento específico'}
                                        </span>
                                    </div>
                                </div>
                                <div className="patient-status">
                                    <div className="status-indicator active"></div>
                                    <span>Ativo</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="empty-patients">
                            <div className="empty-icon">👥</div>
                            <h3>Nenhum paciente ativo</h3>
                            <p>Este psicólogo não possui pacientes em tratamento no momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}