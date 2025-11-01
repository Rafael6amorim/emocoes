import './consultation_images.css'
import './consultation.css' // reutiliza o estilo do empty state
import React, { useState, useEffect } from 'react';
import { API_URL } from '../../service/api_service';

const ConsultationImages = ({ onNavigateBack }) => {
    const [consultas, setConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const getUserInfo = () => {
        try {
            const usuario = localStorage.getItem('usuario');
            if (usuario) return JSON.parse(usuario);
        } catch (e) {
            console.error(e);
        }
        return null;
    };

    const userInfo = getUserInfo();
    const isComum = userInfo?.tipo_usuario === 'comum';

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                let url = '';
                if (isComum) {
                    url = `${API_URL}/imagens/usuario/${userInfo.id_usuario}/`;
                } else {
                    const params = new URLSearchParams({
                        tipo_usuario: userInfo.tipo_usuario,
                        usuario_email: userInfo.email
                    });
                    url = `${API_URL}/listar/consultas/?${params.toString()}`;
                }

                const response = await fetch(url);
                if (!response.ok) throw new Error('Erro ao carregar dados');

                const data = await response.json();
                // Se API de imagens, já é lista direta
                const lista = Array.isArray(data) ? data : data.imagens || [];
                const consultasProcessadas = lista.map(c => ({
                    ...c,
                    imagem_base64: c.imagem_base64 || null,
                    tem_imagem: !!c.imagem_base64
                }));

                setConsultas(consultasProcessadas);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultas();
    }, [isComum, userInfo]);


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
                <button onClick={onNavigateBack} className="back-button">Voltar</button>
                <h1>{isComum ? 'Minhas Imagens' : 'Consultas e Imagens'}</h1>
            </div>

            {isComum ? (
                <div className="imagens-usuario">
                    {consultas.length > 0 ? (
                        <div className="imagens-grid">
                            {consultas.map(img => (
                                <div key={img.id_imagem} className="imagem-card">
                                    <h3>{img.nome_imagem}</h3>
                                    <p><strong>Data:</strong> {new Date(img.data_imagem).toLocaleString('pt-BR')}</p>
                                    {img.imagem_base64 ? (
                                        <img
                                            src={img.imagem_base64}
                                            alt={img.nome_imagem}
                                            className="preview-img"
                                            onClick={() => setSelectedConsulta(img)}
                                        />
                                    ) : (
                                        <div className="image-placeholder">
                                            <i className="fas fa-image"></i>
                                            <p>Nenhuma imagem disponível</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-patients">
                            <div className="empty-icon">🖼️</div>
                            <h3>Nenhuma imagem encontrada</h3>
                            <p>Você ainda não possui imagens cadastradas.</p>
                        </div>
                    )}

                    {/* Modal para exibir imagem */}
                    {selectedConsulta && (
                        <div className="image-modal-overlay" onClick={() => setSelectedConsulta(null)}>
                            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>{selectedConsulta.nome_imagem}</h2>
                                    <button className="modal-close" onClick={() => setSelectedConsulta(null)}>×</button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Data:</strong> {new Date(selectedConsulta.data_imagem).toLocaleString('pt-BR')}</p>
                                    <img
                                        src={selectedConsulta.imagem_base64}
                                        alt={selectedConsulta.nome_imagem}
                                        className="modal-image"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const errorDiv = e.target.nextSibling;
                                            if (errorDiv) errorDiv.style.display = 'block';
                                        }}
                                    />
                                    <div className="image-error" style={{ display: 'none' }}>
                                        <i className="fas fa-exclamation-triangle"></i>
                                        <p>Erro ao carregar imagem</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // Layout antigo para consultas
                <div>
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

                    {filteredConsultas.length === 0 ? (
                        <div className="empty-patients">
                            <div className="empty-icon">📄</div>
                            <h3>Nenhuma consulta encontrada</h3>
                            <p>Não há consultas para exibir no momento.</p>
                        </div>
                    ) : (
                        Object.entries(consultasPorPaciente).map(([paciente, consultasPaciente]) => (
                            <div key={paciente} className="paciente-group">
                                <h2 className="paciente-name">{paciente}</h2>
                                <div className="consultas-grid">
                                    {consultasPaciente.map(consulta => (
                                        <div key={consulta.id_consulta} className="consulta-card">
                                            <div className="consulta-header">
                                                <h3>Consulta #{consulta.id_consulta}</h3>
                                                {consulta.tem_imagem && <span className="badge has-image">Tem Imagem</span>}
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
                        ))
                    )}

                    {/* Modal de consulta antigo */}
                    {selectedConsulta && (
                        <div className="image-modal-overlay" onClick={closeImageModal}>
                            <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h2>Consulta de {selectedConsulta.nome_paciente}</h2>
                                    <button className="modal-close" onClick={closeImageModal}>×</button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Paciente:</strong> {selectedConsulta.nome_paciente}</p>
                                    <p><strong>Data:</strong> {new Date(selectedConsulta.data_consulta).toLocaleDateString('pt-BR')}</p>
                                    {selectedConsulta.nome_imagens && (
                                        <p><strong>Nome da Imagem:</strong> {selectedConsulta.nome_imagens}</p>
                                    )}
                                    {selectedConsulta.imagem_base64 && (
                                        <img
                                            src={selectedConsulta.imagem_base64}
                                            alt={selectedConsulta.nome_imagens}
                                            className="modal-image"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );

};

export default ConsultationImages;