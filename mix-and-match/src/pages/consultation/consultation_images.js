import './consultation_images.css'
import React, { useState, useEffect } from 'react';

const ConsultationImages = ({ onNavigateBack }) => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Obter informações do usuário do localStorage
    const getUserInfo = () => {
        try {
            const usuario = localStorage.getItem('usuario');
            if (usuario) {
                const userData = JSON.parse(usuario);
                console.log('Dados do usuário:', userData); // DEBUG
                return userData;
            }
        } catch (error) {
            console.error('Erro ao obter informações do usuário:', error);
        }
        return null;
    };

    useEffect(() => {
        fetchConsultas();
    }, []);

    const fetchConsultas = async () => {
        try {
            const userInfo = getUserInfo();
            let url = 'http://127.0.0.1:8000/api/listar/consultas/';

            if (userInfo && userInfo.tipo_usuario) {
                const params = new URLSearchParams({
                    tipo_usuario: userInfo.tipo_usuario,
                    usuario_email: userInfo.email  // ← Agora envia o email
                });

                // Para pacientes, ainda usa nome
                if (userInfo.tipo_usuario === 'comum') {
                    params.append('usuario_nome', userInfo.nome || userInfo.username);
                }

                url += `?${params.toString()}`;
            }

            console.log('URL da requisição:', url);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Erro ao carregar consultas');
            }

            const data = await response.json();
            console.log('Dados recebidos:', data); // DEBUG

            // Processa as consultas
            const consultasProcessadas = data.map(consulta => ({
                ...consulta,
                imagem_base64: consulta.imagem_base64 || null,
                tem_imagem: !!consulta.imagem_base64
            }));

            setConsultas(consultasProcessadas);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // DEBUG: Adicione isto para ver os dados
    useEffect(() => {
        if (consultas.length > 0) {
            console.log('Consultas carregadas:', consultas);
            consultas.forEach((consulta, index) => {
                console.log(`Consulta ${index}:`, {
                    id: consulta.id_consulta,
                    tem_imagem: consulta.tem_imagem,
                    imagem_length: consulta.imagens ? consulta.imagens.length : 0,
                    base64_prefix: consulta.imagem_base64 ? consulta.imagem_base64.substring(0, 50) + '...' : null
                });
            });
        }
    }, [consultas]);

    // Filtra consultas baseado nos filtros
    const filteredConsultas = consultas.filter(consulta => {
        const paciente = consulta.nome_paciente?.toLowerCase() || '';
        const psicologo = consulta.nome_psicologo?.toLowerCase() || '';
        const termo = searchTerm.toLowerCase();

        const matchesSearch = paciente.includes(termo) || psicologo.includes(termo);

        const matchesFilter = filter === 'all' ||
            (filter === 'with_images' && consulta.tem_imagem) ||
            (filter === 'without_images' && !consulta.tem_imagem);

        return matchesSearch && matchesFilter;
    });

    // Agrupa consultas por paciente
    const consultasPorPaciente = filteredConsultas.reduce((acc, consulta) => {
        if (!acc[consulta.nome_paciente]) {
            acc[consulta.nome_paciente] = [];
        }
        acc[consulta.nome_paciente].push(consulta);
        return acc;
    }, {});

    const openImageModal = (consulta) => {
        setSelectedConsulta(consulta);
    };

    const closeImageModal = () => {
        setSelectedConsulta(null);
    };

    if (loading) return <div className="loading">Carregando consultas...</div>;
    if (error) return <div className="error">Erro: {error}</div>;

    return (
        <div className="consultation-images-container">
            <div className="page-header">
                <button onClick={onNavigateBack} className="back-button">
                    Voltar
                </button>
                <h1>Consultas e Imagens</h1>

                <div className="controls">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Buscar por paciente ou psicólogo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            {/* Mensagem de boas-vindas com tipo de usuário */}
            {getUserInfo() && (
                <div className="user-welcome">
                    <p>Logado como: <strong>{getUserInfo().tipo_usuario}</strong> - {getUserInfo().nome || getUserInfo().username || getUserInfo().email}</p>
                </div>
            )}

            {/* Lista agrupada por paciente */}
            {Object.entries(consultasPorPaciente).map(([paciente, consultasPaciente]) => (
                <div key={paciente} className="paciente-group">
                    <h2 className="paciente-name">{paciente}</h2>

                    <div className="consultas-grid">
                        {consultasPaciente.map(consulta => (
                            <div key={consulta.id_consulta} className="consulta-card">
                                <div className="consulta-header">
                                    <h3>Consulta #{consulta.id_consulta}</h3>
                                    {consulta.tem_imagem && (
                                        <span className="badge has-image">Tem Imagem</span>
                                    )}
                                </div>

                                <div className="consulta-info">
                                    <p><strong>Data:</strong> {new Date(consulta.data_consulta).toLocaleDateString('pt-BR')}</p>
                                    <p><strong>Idade:</strong> {consulta.idade} anos</p>
                                    <p><strong>Tratamento:</strong> {consulta.tipo_tratamento}</p>
                                    {consulta.nome_psicologo && (
                                        <p><strong>Psicólogo:</strong> {consulta.nome_psicologo} - CRP: {consulta.crp}</p>
                                    )}
                                    <p><strong>Abordagem:</strong> {consulta.abordagem}</p>
                                </div>

                                <div className="consulta-actions">
                                    <button
                                        className="btn-view-image"
                                        onClick={() => openImageModal(consulta)}
                                        disabled={!consulta.tem_imagem}
                                    >
                                        {consulta.tem_imagem ? 'Ver Imagem' : 'Sem Imagem'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Modal para exibir a imagem */}
            {selectedConsulta && (
                <div className="image-modal-overlay" onClick={closeImageModal}>
                    <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Consulta de {selectedConsulta.nome_paciente}</h2>
                            <button className="modal-close" onClick={closeImageModal}>×</button>
                        </div>

                        <div className="modal-body">
                            <div className="consulta-details">
                                <p><strong>Paciente:</strong> {selectedConsulta.nome_paciente}</p>
                                <p><strong>Data:</strong> {new Date(selectedConsulta.data_consulta).toLocaleDateString('pt-BR')}</p>
                                <p><strong>Tratamento:</strong> {selectedConsulta.tipo_tratamento}</p>
                                {selectedConsulta.nome_imagens && (
                                    <p><strong>Nome da Imagem:</strong> {selectedConsulta.nome_imagens}</p>
                                )}
                            </div>

                            <div className="image-container">
                                {selectedConsulta.imagem_base64 ? (
                                    <div className="image-wrapper">
                                        <img
                                            src={selectedConsulta.imagem_base64}
                                            alt={`Consulta de ${selectedConsulta.nome_paciente} - ${selectedConsulta.nome_imagens}`}
                                            className="consultation-image"
                                            onError={(e) => {
                                                console.error('Erro ao carregar imagem:', e);
                                                e.target.style.display = 'none';
                                                // Mostra mensagem de erro se a imagem falhar
                                                const errorDiv = e.target.nextSibling;
                                                if (errorDiv) errorDiv.style.display = 'block';
                                            }}
                                        />
                                        <div className="image-error" style={{ display: 'none' }}>
                                            <i className="fas fa-exclamation-triangle"></i>
                                            <p>Erro ao carregar imagem</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="image-placeholder">
                                        <i className="fas fa-image"></i>
                                        <p>Nenhuma imagem disponível</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConsultationImages;