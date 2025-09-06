import "./environment.css";
import React, { useState } from "react";
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

  const bonecos = {
    // boneco2: `${assetsPath}/bonecos/Boneco 2.png`,
    // boneco1: `${assetsPath}/bonecos/Boneco 3.png`,
    boneco4: `${assetsPath}/bonecos/boneco2.png`
  };

  const keys = Object.keys(bonecos);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fundoSelecionado, setFundoSelecionado] = useState(null);
  const [etapa, setEtapa] = useState(1);
  const [BonecoSelecionado, setBonecoSelecionado] = useState(null);
  const [skinColor, setSkinColor] = useState("#f5c6a5");

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + keys.length) % keys.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % keys.length);
  };

  const handleAvancar = () => {
    if (fundoSelecionado !== null && BonecoSelecionado !== null) {
      onNavigateToGame(fundoSelecionado, BonecoSelecionado, skinColor);
    } else {
      alert("Por favor, selecione um fundo e um boneco.");
    }
  };


  const hexToRgb = (hex) => {
    const cleanHex = hex.replace("#", "");
    const bigint = parseInt(cleanHex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };


  return (
    <div className="hambiente">
      <div className="container-hambiente">
        <h1 className="title-hambiente">Brincando de sentir</h1>

        {etapa === 1 && (
          <div className="fundo-hambiente">
            <h4 className="subtitle-hambiente">Escolha o seu fundo favorito</h4>
            <ul className="background-list">
              {Object.entries(fundos).map(([key, url]) => (
                <li
                  key={key}
                  className={`background-item ${fundoSelecionado === url ? 'selected' : ''}`}
                  onClick={() => {
                    setFundoSelecionado(url);
                    setCurrentIndex(1);
                    setEtapa(2);
                  }}

                >
                  <img src={url} alt={key} className="background-image" />
                  <p className="background-name">{key}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {etapa === 2 && (
          <div className="slideshow-container">
            <h4 className="subtitle-hambiente">Escolha o seu boneco favorito</h4>
            <div className="slide-show-wrapper">
              {/* <button onClick={handlePrev} className="arrow left">
                <i className="fa-solid fa-chevron-left"></i>
              </button> */}

              <div className="slide-show">
                <ul className="slides-list">
                  {/* {keys.map((key, i) => {
                    const position = i - currentIndex;
                    let className = "slide";

                    // Apenas para 2 imagens
                    if (keys.length === 2) {
                      if (position === 0) className += " center";
                      else className += " side"; 
                    }

                    else {
                      if (position === 0) className += " center";
                      else if (Math.abs(position) === 1 || Math.abs(position) === keys.length - 1)
                        className += " side";
                      else className += " hidden";
                    }

                    return (
                      <li key={key} className={className}>
                        <img src={bonecos[key]} alt={key} />
                      </li>
                    ); */}
                  {/* 
                  })} */}
                  <li className="slide center">
                    <img src={bonecos.boneco4} alt="boneco" />
                  </li>

                </ul>
              </div>
              {/* 
              <button onClick={handleNext} className="arrow right">
                <i className="fa-solid fa-chevron-right"></i>
              </button> */}
            </div>
            <button
              onClick={() => {
                setBonecoSelecionado(bonecos.boneco4);
                setEtapa(3);
              }}
              className="button-avancar"
            >
              Avançar
            </button>


          </div>
        )}

        {etapa === 3 && (
          <div className="slideshow-container">
            <h4 className="subtitle-hambiente">Escolha o tom de pele do boneco selecionado</h4>
            <div className="slide-show-wrapper">
              <div className="boneco-img" style={{
                WebkitMaskImage: `url(${BonecoSelecionado})`,
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                backgroundColor: skinColor,

              }} />
            </div>
            <div className="color-picker">
              <p>Escolha o tom de pele</p>
              <input
                type="range"
                min="0"
                max="100"
                onChange={(e) => {
                  const percent = e.target.value / 100;
                  const light = hexToRgb("#f9d5b2");
                  const dark = hexToRgb("#3b1d0f");

                  const r = Math.round(light.r + (dark.r - light.r) * percent);
                  const g = Math.round(light.g + (dark.g - light.g) * percent);
                  const b = Math.round(light.b + (dark.b - light.b) * percent);

                  setSkinColor(`rgb(${r}, ${g}, ${b})`);
                }}
              />
            </div>

            <button onClick={handleAvancar} className="button-avancar">Avançar</button>
          </div>
        )}
      </div>
    </div>
  );
}
