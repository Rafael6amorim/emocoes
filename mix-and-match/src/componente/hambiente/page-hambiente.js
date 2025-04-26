import "./hambiente.css";
import React from "react";

export default function Hambiente({ onNavigateToGame }) {
    const assetsPath = process.env.PUBLIC_URL + "/assets";
    const fundos = {
        banheiro: `${assetsPath}/fundo/banheiro.jpg`,
        cozinha: `${assetsPath}/fundo/cozinha.jpg`,
        escola: `${assetsPath}/fundo/escola.jpg`,
        parque: `${assetsPath}/fundo/parque.jpg`,
        praia: `${assetsPath}/fundo/praia.jpg`,
        quarto: `${assetsPath}/fundo/quarto.jpg`,
        sala: `${assetsPath}/fundo/SALA.jpg`,
    };

    return (
        <div className="hambiente">
            <div className="container-hambiente">
                <h1 className="title-hambiente">Mix and Match</h1>
                <main>
                    <h4 className="subtitle-hambiente">Escolha o seu fundo favorito</h4>
                    <ul className="background-list">
                        {Object.entries(fundos).map(([key, url]) => (
                            <li
                                key={key}
                                className="background-item"
                                onClick={() => onNavigateToGame(url)}
                            >
                                <img src={url} alt={key} className="background-image" />
                                <p className="background-name">{key}</p>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
        </div>
    );
}
