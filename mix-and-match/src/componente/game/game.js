import "./games.css";
import React, { useState } from "react";

const Game = () => {
  const assetsPath = process.env.PUBLIC_URL + "/assets";

  const items = {
    cabeca: `${assetsPath}/faces/cabeca.png`,
    hairGirl: `${assetsPath}/hair/girl-hear-principal.png`,
    hairMain: `${assetsPath}/hair/main-hear.png`,
    shirt: `${assetsPath}/shirsts/mix-and-match/public/assets/hirsts/Imagem do WhatsApp de 2025-04-04 à(s) 21.20.56_bb1f17c9.png`,
    paints: `${assetsPath}/pants/pant-principal.png`,
    boneco: `${assetsPath}/bonecos/image.png`,
    main: `${assetsPath}/hair/Jogo_Projeto .zip - 16.png`,
    shirtMain: `${assetsPath}/shirsts/Jogo_Projeto .zip - 1.png`,
    esprecoes:`${assetsPath}/espreções/Jogo_Projeto .zip - 43.png`,
  };

  const esprecoesItens = {
    alegria: `${assetsPath}/espreções/alegria.png`,
    raiva:`${assetsPath}/espreções/raiva.png`,
    nojo:`${assetsPath}/espreções/noj.png`,
    medo:`${assetsPath}/espreções/medo.png`,
    tristeza:`${assetsPath}/espreções/Jogo_Projeto .zip - 43.png`,
  }
  

  const guardaRoupa = [
    `${assetsPath}/hair/Jogo_Projeto .zip - 40.png`,
    `${assetsPath}/hair/0.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 16.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 17.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 18.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 19.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 20.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 21.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 22.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 23.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 24.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 25.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 26.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 27.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 28.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 29.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 31.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 32.png(1)`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 33.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 34.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 35.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 36.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 37.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 38.png`,
    `${assetsPath}/hair/Jogo_Projeto .zip - 39.png`,
  ];

  const guardaRoupaPaints = [
    `${assetsPath}/pants/0.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 11.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 13.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 14.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 15.png`,
  ];
  const guardaRoupaShirts = [
    `${assetsPath}/shirsts/0.png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 1.png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 2.png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 3(1).png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 4.png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 6.png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 8.png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 9.png`,
    `${assetsPath}/shirsts/Jogo_Projeto .zip - 10.png`,
  ];


  const [selectedItem, setSelectedItem] = useState(null);
  const [isClothesVisible, setClothesVisible] = useState(false);

  const handleClick = (itemKey) => {
    setSelectedItem(itemKey);
    setClothesVisible(true);
  };

  const closeWardrobe = () => {
    setClothesVisible(false);
  };

  return (
    <div className="Game">
      <header className="Game-header">
        <main className={`game-main ${isClothesVisible ? "show" : ""}`}>
          <section className="expressions">
            <ul className="ul-expressions">
              <li className="alegria">  <img src={esprecoesItens.alegria} className="boneco-img" alt="img do boneco" /></li>
              <li className="medo">  <img src={esprecoesItens.medo} className="boneco-img" alt="img do boneco" /></li>
              <li className="raiva">  <img src={esprecoesItens.raiva} className="boneco-img" alt="img do boneco" /></li>
              <li className="nojo">  <img src={esprecoesItens.nojo} className="boneco-img" alt="img do boneco" /></li>
              <li className="tristeza">  <img src={esprecoesItens.tristeza} className="boneco-img" alt="img do boneco" /></li>
            </ul>
          </section>

          <section className="doll">
            <div className="bonecoMainTest">
              <img src={items.boneco} className="boneco-img" alt="img do boneco" />
            </div>
            <div className="hairMainTest">
              <img src={items.main} className="hair-img" alt="img do cabelo" />
            </div>
            <div className="shirtrMainTest">
              <img src={items.shirtMain} className="shirt-img" alt="img do blusa" />
            </div>
            <div className="esprecaoMainTest">
              <img src={items.esprecoes} className="esprecao-img" alt="img da espreções" />
            </div>
          </section>

          <aside className="clothes">
            <h4>Escolha seu personagem</h4>
            <ul>
              {Object.entries(items)
                .filter(([key]) => key !== "boneco") // Evita listar o boneco
                .map(([key, src]) => (
                  <React.Fragment key={key}>
                    <li onClick={() => handleClick(key)}>
                      <img src={src} className={`${key}-img`} alt={`img ${key}`} />
                    </li>
                    <hr />
                  </React.Fragment>
                ))}
            </ul>
          </aside>

          {isClothesVisible && (
            <Wardrobe
              selectedItem={selectedItem}
              guardaRoupa={guardaRoupa}
              guardaRoupaPaints={guardaRoupaPaints}
              guardaRoupaShirts={guardaRoupaShirts}
              onClose={closeWardrobe}
            />
          )}
        </main>
      </header>
    </div>
  );
};

// **Componente para a guarda-roupa**
const Wardrobe = ({ selectedItem, guardaRoupa, guardaRoupaPaints, guardaRoupaShirts, onClose }) => {
  const titles = {
    cabeca: "Escolha a cabeça",
    hairMain: "Escolha o cabelo dele",
    hairGirl: "Escolha o cabelo dela",
    shirt: "Escolha a camiseta",
    paints: "Escolha a calça",
  };

  let wardrobeItems = [];

  if (selectedItem === "shirt") {
    wardrobeItems = guardaRoupaShirts;
  } else if (selectedItem === "paints") {
    wardrobeItems = guardaRoupaPaints;
  } else {
    wardrobeItems = guardaRoupa;
  }

  return (
    <div className="guarda-roupa" style={{ display: "flex" }}>
      <div className="containerTitle">
        <h4>{titles[selectedItem]}</h4>
      </div>
      <div className="containerImags">
        {wardrobeItems.map((item, index) => (
          <img
            key={index}
            src={item}
            className="img-clothes"
            alt={`${titles[selectedItem]} ${index}`}
            onClick={onClose}
          />
        ))}
      </div>
    </div>
  );
};

export default Game;
