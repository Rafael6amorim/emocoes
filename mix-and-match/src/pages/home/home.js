import "./home.css";
import React from "react";

export default function Home({ onNavigate, onLogout, userType, onNavigateToRegisterPsicologo, onNavigateToRegisterPaciente }) {
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
                    {/* Botão comum para todos os usuários */}
                    <button onClick={onNavigate} className="button-home">
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
                    
                    {/* Botão exclusivo para clínicas */}
                    {userType === "clinica" && (
                        <button onClick={onNavigateToRegisterPsicologo} className="button-home">
                            Cadastrar Psicólogo
                        </button>
                    )}
                    
                    {/* Link de logout para todos os usuários */}
                    <a className="logout" onClick={onLogout}>
                        Logout
                    </a>
                </div>
            </div>
        </div>
    );
}