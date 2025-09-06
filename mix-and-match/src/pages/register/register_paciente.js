import { useState } from "react";
import axios from "axios";
import "./register.css";

export default function RegisterPaciente({ onRegisterSuccess }) {
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [tipoTratamento, setTipoTratamento] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Obter os dados do usuário logado do localStorage
            const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
            console.log(usuarioLogado);
            
            // Buscar o psicólogo pelo ID do usuário
            let id_psicologo = null;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/psicologo/usuario/${usuarioLogado.id_usuario}/`);
                if (response.data && response.data.id_psicologo) {
                    id_psicologo = response.data.id_psicologo;
                    console.log("Psicólogo encontrado:", id_psicologo);
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

            const dadosPaciente = {
                nome,
                idade: parseInt(idade),
                tipo_tratamento: tipoTratamento,
                id_psicologo: id_psicologo // Usa o ID do psicólogo encontrado
            };

            await axios.post("http://127.0.0.1:8000/api/popular/pacientes/", {
                pacientes: [dadosPaciente],
            });
            
            alert("Paciente cadastrado com sucesso!");
            onRegisterSuccess();
            setMensagem("Paciente cadastrado com sucesso!");
            
        } catch (error) {
            console.error(error);
            setMensagem("Erro ao cadastrar: " + (error.response?.data?.erro || "Desconhecido"));
        }
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

                <button type="submit">Cadastrar Paciente</button>

                {mensagem && <p className="mensagem">{mensagem}</p>}
            </form>
        </div>
    );
}