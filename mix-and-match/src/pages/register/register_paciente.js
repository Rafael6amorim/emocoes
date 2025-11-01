import { useState } from "react";
import axios from "axios";
import "./register.css";
import { API_URL } from "../../service/api_service";

export default function RegisterPaciente({ onRegisterSuccess, onCancel }) {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [tipoTratamento, setTipoTratamento] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Obter os dados do usuário logado do localStorage
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            console.log("Usuário logado:", usuarioLogado);

            // Buscar o psicólogo pelo ID do usuário
            let id_psicologo = null;
            try {
                const response = await axios.get(`${API_URL}/psicologo/usuario/${usuarioLogado.id_usuario}/`);
                console.log("Resposta da API:", response.data);
                
                // Verifica se a resposta é um array ou um objeto único
                if (Array.isArray(response.data) && response.data.length > 0) {
                    // Se for array, pega o primeiro psicólogo
                    id_psicologo = response.data[0].id_psicologo;
                    console.log("Psicólogo encontrado (array):", id_psicologo);
                } else if (response.data && response.data.id_psicologo) {
                    // Se for um objeto único com id_psicologo
                    id_psicologo = response.data.id_psicologo;
                    console.log("Psicólogo encontrado (objeto):", id_psicologo);
                } else if (usuarioLogado.id_psicologo) {
                    // Se o próprio usuário logado já tem id_psicologo (como no seu log)
                    id_psicologo = usuarioLogado.id_psicologo;
                    console.log("Psicólogo do usuário logado:", id_psicologo);
                }
            } catch (error) {
                console.error("Erro ao buscar psicólogo:", error);
                setMensagem("Erro ao buscar dados do psicólogo. Tente novamente.");
                return;
            }

            if (!id_psicologo) {
                setMensagem("Erro: Psicólogo não encontrado. Faça login novamente.");
                return;
            }

            // 1️⃣ Primeiro criar um novo usuário para o paciente
            const resUsuario = await axios.post(
                `${API_URL}/criar_Usuario/usario/`,
                {
                    email,
                    senha,
                    tipo_usuario: "paciente",
                }
            );

            const id_usuario_paciente = resUsuario.data.usuario.id_usuario;

            // 2️⃣ Agora cadastrar o paciente com o novo ID de usuário
            const dadosPaciente = {
                nome,
                idade: parseInt(idade),
                tipo_tratamento: tipoTratamento,
                id_psicologo: id_psicologo, // ID do psicólogo que está cadastrando
                id_usuario: id_usuario_paciente // ID do novo usuário criado para o paciente
            };

            await axios.post(`${API_URL}/popular/pacientes/`, {
                pacientes: [dadosPaciente],
            });

            alert("Paciente cadastrado com sucesso!");
            onRegisterSuccess();
            setMensagem("Paciente cadastrado com sucesso!");

        } catch (error) {
            console.error("Erro detalhado:", error);
            setMensagem("Erro ao cadastrar: " + (error.response?.data?.erro || "Desconhecido"));
        }
    };

    const handleCancel = () => {
        if (typeof onCancel === "function") return onCancel();
        if (window.history.length > 1) return window.history.back();
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Cadastrar Paciente</h2>

                <input
                    type="text"
                    placeholder="Nome do paciente"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Tipo de tratamento"
                    value={tipoTratamento}
                    onChange={(e) => setTipoTratamento(e.target.value)}
                    required
                />

                <input
                    type="email"
                    placeholder="Email do paciente"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha do paciente"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <div>
                    <button type="button" onClick={handleCancel}>Cancelar</button>
                    <button type="submit">Cadastrar Paciente</button>
                </div>

                {mensagem && <p className="mensagem">{mensagem}</p>}
            </form>
        </div>
    );
}