import { useState } from "react";
import "./login.css";
import { API_URL } from '../../service/api_service'
import Register from "../register/register";

export default function Login({ onLoginSuccess, onNavigateToRegister }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/login/usuario/?email=${email}&senha=${senha}`
      );

      const data = await response.json();

      if (!response.ok) {
        setMensagem(data.erro || "Erro ao fazer login");
        return;
      }

      // Se a API não retornar o tipo de usuário, precisamos buscar essa informação
      let userType = data.usuario.tipo_usuario;
      
      // Se não estiver na resposta principal, faça uma requisição adicional
      if (!userType) {
        const userInfoResponse = await fetch(
          `${API_URL}/usuario/${data.usuario.id_usuario}/tipo/`
        );
        
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json();
          userType = userInfo.tipo_usuario;
        }
      }

      // Buscar informações adicionais baseadas no tipo de usuário
      let id_psicologo = null;
      let id_clinica = null;

      if (userType === "psicologo") {
        // Buscar ID do psicólogo
        try {
          const psicologoResponse = await fetch(
            `${API_URL}/psicologo/usuario/${data.usuario.id_usuario}/`
          );
          if (psicologoResponse.ok) {
            const psicologoData = await psicologoResponse.json();
            id_psicologo = psicologoData.id_psicologo;
            id_clinica = psicologoData.id_clinica;
          }
        } catch (error) {
          console.error("Erro ao buscar dados do psicólogo:", error);
        }
      } else if (userType === "clinica") {
        // Buscar ID da clínica
        try {
          const clinicaResponse = await fetch(
            `${API_URL}/clinica/usuario/${data.usuario.id_usuario}/`
          );
          if (clinicaResponse.ok) {
            const clinicaData = await clinicaResponse.json();
            id_clinica = clinicaData.id_clinica;
          }
        } catch (error) {
          console.error("Erro ao buscar dados da clínica:", error);
        }
      }

      // Adiciona todas as informações ao objeto do usuário
      const userData = {
        ...data.usuario,
        tipo_usuario: userType || 'comum', // Padrão para 'comum' se não encontrar
        id_psicologo: id_psicologo,
        id_clinica: id_clinica
      };

      // Se chegou aqui, login foi bem-sucedido ✅
      localStorage.setItem("usuario", JSON.stringify(userData));
      setMensagem(""); // limpa mensagens de erro
      onLoginSuccess(userData); // chama a prop que troca para a Home

    } catch (error) {
      setMensagem("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

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

        <button type="submit">Entrar</button>
        <button type="button" onClick={onNavigateToRegister}>
          Cadastrar-se
        </button>
        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
    </div>
  );
}