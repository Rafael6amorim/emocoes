import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../service/api_service";

export default function Register({ onRegisterSuccess }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [nomePsicologo, setNomePsicologo] = useState("");
    const [abordagem, setAbordagem] = useState("");
    const [crp, setCrp] = useState("");
    const [idClinica, setIdClinica] = useState("");
    const [nomeClinica, setNomeClinica] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [endereco, setEndereco] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [clinicas, setClinicas] = useState([]);
    const [loadingClinicas, setLoadingClinicas] = useState(false);

    // Carregar clínicas quando o tipo de usuário for psicólogo
    useEffect(() => {
        if (tipoUsuario === "psicologo") {
            carregarClinicas();
        }
    }, [tipoUsuario]);

    const carregarClinicas = async () => {
        setLoadingClinicas(true);
        try {
            const response = await axios.get(`${API_URL}/listar/clinicas/`);
            setClinicas(response.data);
        } catch (error) {
            console.error("Erro ao carregar clínicas:", error);
            setMensagem("Erro ao carregar lista de clínicas");
        }
        setLoadingClinicas(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // 1️⃣ Cria o usuário
            const resUsuario = await axios.post(
                `${API_URL}/criar_Usuario/usario/`,
                {
                    email,
                    senha,
                    tipo_usuario: tipoUsuario,
                }
            );

            const id_usuario = resUsuario.data.usuario.id_usuario;

            // 2️⃣ Se for psicólogo, cadastrar na tabela de psicólogos
            if (tipoUsuario === "psicologo") {
                const dadosPsicologo = {
                    nome_psicologo: nomePsicologo,
                    abordagem,
                    crp,
                    id_usuario,
                };

                // Adiciona a clínica apenas se foi selecionada
                if (idClinica) {
                    dadosPsicologo.id_clinica = parseInt(idClinica);
                }

                await axios.post(`${API_URL}/popular/psicologos/`, {
                    psicologos: [dadosPsicologo],
                });
            }

            // 3️⃣ Se for clínica, cadastrar na tabela de clínicas
            if (tipoUsuario === "clinica") {
                await axios.post(`${API_URL}/popular/clinicas/`, {
                    clinicas: [
                        {
                            id_usuario,
                            nome_clinica: nomeClinica,
                            cnpj,
                            endereco,
                        },
                    ],
                });
            }
            
            alert("Cadastro realizado com sucesso! Agora faça login.");
            onRegisterSuccess();
            setMensagem("Cadastro realizado com sucesso!");
            
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao cadastrar: " + error.response?.data?.erro || "Desconhecido");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Register</h2>

                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <label htmlFor="tipoUsuario">Tipo de usuário</label>
                <select
                    id="tipoUsuario"
                    value={tipoUsuario}
                    onChange={(e) => setTipoUsuario(e.target.value)}
                    required
                >
                    <option value="">Selecione...</option>
                    <option value="comum">Usuário comum</option>
                    <option value="psicologo">Psicólogo</option>
                    <option value="clinica">Clínica</option>
                </select>

                {/* Campos extras para psicólogo */}
                {tipoUsuario === "psicologo" && (
                    <>
                        <input
                            type="text"
                            placeholder="Nome do psicólogo"
                            value={nomePsicologo}
                            onChange={(e) => setNomePsicologo(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Abordagem"
                            value={abordagem}
                            onChange={(e) => setAbordagem(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CRP"
                            value={crp}
                            onChange={(e) => setCrp(e.target.value)}
                            required
                        />
                        
                    </>
                )}

                {/* Campos extras para clínica */}
                {tipoUsuario === "clinica" && (
                    <>
                        <input
                            type="text"
                            placeholder="Nome da clínica"
                            value={nomeClinica}
                            onChange={(e) => setNomeClinica(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CNPJ"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Endereço"
                            value={endereco}
                            onChange={(e) => setEndereco(e.target.value)}
                            required
                        />
                    </>
                )}

                <button type="submit">Cadastrar</button>

                {mensagem && <p className="mensagem">{mensagem}</p>}
            </form>
        </div>
    );
}