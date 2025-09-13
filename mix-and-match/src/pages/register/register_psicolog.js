import { useState } from "react";
import axios from "axios";
import "./register.css";

export default function RegisterPsicologo({ onRegisterSuccess }) {
    const [nomePsicologo, setNomePsicologo] = useState("");
    const [abordagem, setAbordagem] = useState("");
    const [crp, setCrp] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Obter os dados do usuário logado do localStorage
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            console.log(usuarioLogado);

            // Buscar a clínica pelo ID do usuário
            let id_clinica = null;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/clinica/usuario/${usuarioLogado.id_usuario}/`);
                if (response.data && response.data.id_clinica) {
                    id_clinica = response.data.id_clinica;
                    console.log("Clínica encontrada:", id_clinica);
                }
            } catch (error) {
                console.error("Erro detalhado:", error.response?.data || error.message);
                setMensagem("Erro ao cadastrar: " + JSON.stringify(error.response?.data));
            }

            if (!id_clinica) {
                setMensagem("Erro: Clínica não encontrada. Faça login novamente.");
                return;
            }

            // 1️⃣ Primeiro criar um novo usuário para o psicólogo
            const resUsuario = await axios.post(
                "http://127.0.0.1:8000/api/criar_Usuario/usario/",
                {
                    email,
                    senha,
                    tipo_usuario: "psicologo",
                }
            );

            const id_usuario_psicologo = resUsuario.data.usuario.id_usuario;

            // 2️⃣ Agora cadastrar o psicólogo com o novo ID de usuário
            const dadosPsicologo = {
                nome_psicologo: nomePsicologo,
                abordagem,
                crp,
                id_usuario: id_usuario_psicologo, // ID do novo usuário criado
                id_clinica: id_clinica // ID da clínica encontrada
            };

            await axios.post("http://127.0.0.1:8000/api/popular/psicologos/", {
                psicologos: [dadosPsicologo],
            });

            alert("Psicólogo cadastrado com sucesso!");
            onRegisterSuccess();
            setMensagem("Psicólogo cadastrado com sucesso!");

        } catch (error) {
            console.error("Erro detalhado:", error.response?.data || error.message);
            setMensagem("Erro ao cadastrar: " + JSON.stringify(error.response?.data));
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Cadastrar Psicólogo</h2>

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

                <input
                    type="email"
                    placeholder="Email do psicólogo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Senha do psicólogo"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                <button type="submit">Cadastrar Psicólogo</button>

                {mensagem && <p className="mensagem">{mensagem}</p>}
            </form>
        </div>
    );
}