import "./home.css";
import React from "react";

export default function Home({ onNavigate }) {
    return (
        <div className="Home">
            <div className="container-home">
                <h1 className="title-home">Mix and Match</h1>
                <p className="p-home">Este jogo é uma ferramenta terapêutica pensada para crianças. De forma lúdica e segura, ele ajuda a expressar sentimentos, fortalecer o vínculo com o terapeuta e trabalhar emoções difíceis de serem verbalizadas, promovendo autoconhecimento e desenvolvimento emocional.</p>
                <button onClick={onNavigate} className="button-home">Vamos Brincar!</button>
            </div>
        </div>

    );
}