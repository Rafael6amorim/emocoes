import "./games.css";
import React, { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";

export default function Game({ fundoSelecionado, BonecoSelecionado, skinColor, onNavigateBack }) {

  const assetsPath = process.env.PUBLIC_URL + "/assets";

  const items = {
    cabeca: `${assetsPath}/faces/cabeca.png`,
    hairGirl: `${assetsPath}/hair/girl-hear-principal.png`,
    hairMain: `${assetsPath}/hair/main-hear.png`,
    shirtMain: `${assetsPath}/shirsts/shirt-principal.png`,
    dressMain: `${assetsPath}/shirsts/dress-principal.png`,
    paints: `${assetsPath}/pants/pant-principal.png`,
    esprecao: `${assetsPath}/esprecoes/aleggriaMain.png`,
  };

  const esprecoesItens = [
    { src: `${assetsPath}/esprecoes/alegria.png`, className: "alegria" },
    { src: `${assetsPath}/esprecoes/raiva.png`, className: "raiva" },
    { src: `${assetsPath}/esprecoes/nojo.png`, className: "nojo" },
    { src: `${assetsPath}/esprecoes/medo.png`, className: "medo" },
    { src: `${assetsPath}/esprecoes/tristeza.png`, className: "tristeza" },
  ];

  const guardaRoupa = [
    `${assetsPath}/hair/longo-cacheado/0.png`,
    `${assetsPath}/hair/longo-cacheado/Jogo_Projeto .zip - 26.png`,
    `${assetsPath}/hair/longo-cacheado/Jogo_Projeto .zip - 27.png`,
    `${assetsPath}/hair/longo-cacheado/Jogo_Projeto .zip - 28.png`,
    `${assetsPath}/hair/longo-cacheado/Jogo_Projeto .zip - 29.png`,
    `${assetsPath}/hair/longo-liso/Jogo_Projeto .zip - 16.png`,
    `${assetsPath}/hair/longo-liso/Jogo_Projeto .zip - 17.png`,
    `${assetsPath}/hair/longo-liso/Jogo_Projeto .zip - 18.png`,
    `${assetsPath}/hair/longo-liso/Jogo_Projeto .zip - 19.png`,
    `${assetsPath}/hair/longo-liso/Jogo_Projeto .zip - 20.png`,
    `${assetsPath}/hair/longo-ondulado/Jogo_Projeto .zip - 21.png`,
    `${assetsPath}/hair/longo-ondulado/Jogo_Projeto .zip - 22.png`,
    `${assetsPath}/hair/longo-ondulado/Jogo_Projeto .zip - 23.png`,
    `${assetsPath}/hair/longo-ondulado/Jogo_Projeto .zip - 24.png`,
    `${assetsPath}/hair/longo-ondulado/Jogo_Projeto .zip - 25.png`,
  ];

  const guardaRoupaCabelo = [
    `${assetsPath}/hair/curto-liso/Jogo_Projeto .zip - 31.png`,
    `${assetsPath}/hair/curto-liso/hair-red.png`,
    `${assetsPath}/hair/curto-liso/Jogo_Projeto .zip - 33.png`,
    `${assetsPath}/hair/curto-liso/Jogo_Projeto .zip - 34.png`,
    `${assetsPath}/hair/curto-liso/Jogo_Projeto .zip - 35.png`,
    `${assetsPath}/hair/curto-cacheado/Jogo_Projeto .zip - 36.png`,
    `${assetsPath}/hair/curto-cacheado/Jogo_Projeto .zip - 37.png`,
    `${assetsPath}/hair/curto-cacheado/Jogo_Projeto .zip - 38.png`,
    `${assetsPath}/hair/curto-cacheado/Jogo_Projeto .zip - 39.png`,
    `${assetsPath}/hair/curto-cacheado/Jogo_Projeto .zip - 40.png`,

  ]

  const guardaRoupaPaints = [
    `${assetsPath}/pants/0.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 11.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 13.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 14.png`,
    `${assetsPath}/pants/Jogo_Projeto .zip - 15.png`,
  ];
  const guardaRoupaShirts = [

    `${assetsPath}/shirsts/shirt/Jogo_Projeto .zip - 6.png`,
    `${assetsPath}/shirsts/shirt/Jogo_Projeto .zip - 8.png`,
    `${assetsPath}/shirsts/shirt/Jogo_Projeto .zip - 9.png`,
    `${assetsPath}/shirsts/shirt/shirtBlue.png`,
    `${assetsPath}/shirsts/shirt/shirtgreen.png`,
  ];

  const guardaRoupaDress = [
    `${assetsPath}/shirsts/dress/0.png`,
    `${assetsPath}/shirsts/dress/Jogo_Projeto .zip - 1.png`,
    `${assetsPath}/shirsts/dress/Jogo_Projeto .zip - 2.png`,
    `${assetsPath}/shirsts/dress/dressRed.png`,
    `${assetsPath}/shirsts/dress/Jogo_Projeto .zip - 5.png`,
  ]


  const [selectedItem, setSelectedItem] = useState(null);
  const [isClothesVisible, setClothesVisible] = useState(false);


  const handleClick = (itemKey) => {
    setSelectedItem(itemKey);
    setClothesVisible(true);
  };


  const closeWardrobe = () => {
    setClothesVisible(false);
  };

  const [itemsPaint, setItemsPaint] = useState({ paint: "" });
  const [itemshairCurtoCacheado, setItemsHairCurtoCacheado] = useState({ hairCurtoCacheado: "" });
  const [itemshairCurtoLiso, setItemsHairCurtoLiso] = useState({ hairCurtoLiso: "" });
  const [itemshairLongoCacheado, setItemsHairLongoCacheado] = useState({ hairLongoCacheado: "" });
  const [itemshairLongoOndulado, setItemsHairLongoOndulado] = useState({ hairLongoOndulado: "" });
  const [itemshairLongoLiso, setItemsHairLongoLiso] = useState({ hairLongoLiso: "" });
  const [itemsShirt, setItemsShirt] = useState({ shirt: "" });
  const [itemsDress, setItemsDress] = useState({ dress: "" });
  const [expressaoAtual, setExpressaoAtual] = useState("");
  const [itemsEsprecoes, setItemsEsprecoes] = useState({ esprecoes: "" });
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [processedBoneco, setProcessedBoneco] = useState(null);
  const gameRef = useRef(null); // 🔹 referência para capturar a div do jogo


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);



  // Função para processar a máscara
  useEffect(() => {
    const processMask = async () => {
      if (!BonecoSelecionado) return;

      try {
        // Carrega a imagem da máscara
        const maskImg = new Image();
        maskImg.crossOrigin = "Anonymous";
        maskImg.src = BonecoSelecionado;

        await new Promise((resolve, reject) => {
          maskImg.onload = resolve;
          maskImg.onerror = reject;
        });

        // Cria canvas para processar
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = maskImg.naturalWidth || 300;
        canvas.height = maskImg.naturalHeight || 400;

        // Desenha a cor da pele
        ctx.fillStyle = skinColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Aplica a máscara
        ctx.globalCompositeOperation = 'destination-in';
        ctx.drawImage(maskImg, 0, 0, canvas.width, canvas.height);

        // Converte para data URL
        setProcessedBoneco(canvas.toDataURL('image/png'));
      } catch (error) {
        console.error("Erro ao processar máscara:", error);
        // Fallback: usa a máscara CSS normal
        setProcessedBoneco(null);
      }
    };

    processMask();
  }, [BonecoSelecionado, skinColor]);


const handleSave = async () => {
  const gameElement = gameRef.current;
  if (!gameElement) return;

  // Pergunta o nome da imagem
  const nomeImagem = prompt("Digite o nome da imagem:", "personagem_captura.png");
  if (!nomeImagem) {
    alert("Nome da imagem é obrigatório!");
    return;
  }

  // Esconde elementos temporários
  const elementsToHide = ['.clothes', '.button', '.guarda-roupa', '.icon'];
  const originalStyles = {};

  elementsToHide.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      const key = `${selector}-${index}`;
      originalStyles[key] = el.style.display;
      el.style.display = 'none';
    });
  });

  await new Promise(resolve => setTimeout(resolve, 500));

  try {
    // CAPTURA A IMAGEM DENTRO DO handleSave
    const canvas = await html2canvas(gameElement, {
      useCORS: true,
      backgroundColor: null,
      scale: 1
    });

    const imgData = canvas.toDataURL("image/png"); // ← Declarada aqui!

    const response = await fetch("http://127.0.0.1:8000/api/salvar_imagens/imagem/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome_imagem: nomeImagem,
        imagem_base64: imgData // ← Agora funciona!
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro do servidor:", errorText);
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log("Imagem salva:", result);
    setScreenshot(imgData);

  } catch (error) {
    console.error("Erro ao salvar imagem:", error);
    alert("Erro ao salvar imagem: " + error.message);
  } finally {
    // Restaura estilos
    Object.keys(originalStyles).forEach(key => {
      const [selector, index] = key.split('-');
      const elements = document.querySelectorAll(selector);
      if (elements[index]) {
        elements[index].style.display = originalStyles[key];
      }
    });
  }
};




  return (
    <div className="Game">
      <header className="Game-header" ref={gameRef}>
        <img src={fundoSelecionado} alt="Fundo selecionado" className="img-fundo" />
        <main className={`game-main ${isClothesVisible ? "show" : ""}`}>
          <section className="doll">

            {processedBoneco ? (
              <img
                src={processedBoneco}
                className="boneco-processado"
                alt="Personagem"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : (
              <div
                className="boneco-img"
                style={{
                  WebkitMaskImage: `url(${BonecoSelecionado})`,
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  backgroundColor: skinColor,
                }}
              ></div>
            )}


            {itemshairCurtoCacheado.hairCurtoCacheado && (
              <div className="vestivel item-topo">
                <img src={itemshairCurtoCacheado.hairCurtoCacheado} className="roupa hair-curto-cacheado-img" alt="img do cabelo" />
              </div>
            )}
            {itemshairCurtoLiso.hairCurtoLiso && (
              <div className="vestivel item-topo">
                <img src={itemshairCurtoLiso.hairCurtoLiso} className="roupa hair-curto-liso-img" alt="img do cabelo" />
              </div>
            )}
            {itemshairLongoCacheado.hairLongoCacheado && (
              <div className="vestivel item-topo">
                <img src={itemshairLongoCacheado.hairLongoCacheado} className="roupa hair-longo-cacheado-img" alt="img do cabelo" />
              </div>
            )}
            {itemshairLongoOndulado.hairLongoOndulado && (
              <div className="vestivel item-topo">
                <img src={itemshairLongoOndulado.hairLongoOndulado} className="roupa hair-longo-ondulado-img" alt="img do cabelo" />
              </div>
            )}
            {itemshairLongoLiso.hairLongoLiso && (
              <div className="vestivel item-topo">
                <img src={itemshairLongoLiso.hairLongoLiso} className="roupa hair-longo-liso-img" alt="img do cabelo" />
              </div>
            )}

            {itemsShirt.shirt && (
              <div className="shirtrMainTest">
                <img src={itemsShirt.shirt} className="roupa shirt-img" alt="img do blusa" />
              </div>
            )}
            {itemsDress.dress && (
              <div className="shirtrMainTest">
                <img src={itemsDress.dress} className="roupa dress-img" alt="img do blusa" />
              </div>
            )}

            {itemsPaint.paint && (
              <div className="paintTest">
                <img src={itemsPaint.paint} className="roupa calca-img" alt="img da calça" />
              </div>
            )}
            {itemsEsprecoes.esprecoes && (
              <div className="expressao-wrapper">
                <img
                  src={itemsEsprecoes.esprecoes}
                  className={`esprecao-img esprecao-img-${expressaoAtual}`}
                  alt={`Expressão ${expressaoAtual}`}
                  onError={(e) => {
                    console.error("Erro ao carregar expressão:", itemsEsprecoes.esprecoes);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

          </section>



          <aside
            className={`clothes ${isClothesVisible ? "show" : ""}`}
            style={
              isMobile ? {
                top: isAsideOpen ? '68%' : '88%',
                height: isAsideOpen ? '30%' : '100%',
              } : undefined // Mantém undefined para desktop (usa o CSS padrão)
            }
          >
            {isMobile && (
              <div
                className="icon"
                onClick={() => {
                  setIsAsideOpen((prev) => !prev);
                }}
              >
                <i
                  className="fa-solid fa-chevron-up"
                  style={{
                    transition: 'transform 0.3s ease',
                    transform: isAsideOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    display: 'inline-block',
                  }}
                />


              </div>
            )}


            <h4>Monte seu personagem</h4>
            <ul>
              {Object.entries(items)
                .filter(([key]) => ["paints", "shirtMain", "hairMain", "hairGirl", "esprecao", "dressMain"].includes(key))
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
              assetsPath={assetsPath}
              selectedItem={selectedItem}
              guardaRoupa={guardaRoupa}
              guardaRoupaCabelo={guardaRoupaCabelo}
              guardaRoupaPaints={guardaRoupaPaints}
              guardaRoupaShirts={guardaRoupaShirts}
              guardaRoupaDress={guardaRoupaDress}
              esprecoesItens={esprecoesItens}
              setItemsPaint={setItemsPaint}
              setItemsHairCurtoCacheado={setItemsHairCurtoCacheado}
              setItemsHairCurtoLiso={setItemsHairCurtoLiso}
              setItemsHairLongoCacheado={setItemsHairLongoCacheado}
              setItemsHairLongoOndulado={setItemsHairLongoOndulado}
              setItemsHairLongoLiso={setItemsHairLongoLiso}
              setItemsShirt={setItemsShirt}
              setItemsDress={setItemsDress}
              setItemsEsprecoes={setItemsEsprecoes}
              setExpressaoAtual={setExpressaoAtual}
              onClose={closeWardrobe}
            />
          )}

          <button onClick={onNavigateBack} className=" button button-voltar">Voltar</button>
          <button onClick={handleSave} className="button button-salvar">Salvar</button>
        </main>
      </header>
    </div >
  );
};

const Wardrobe = ({ assetsPath, selectedItem, guardaRoupa, guardaRoupaCabelo, guardaRoupaPaints, guardaRoupaDress,
  guardaRoupaShirts, setItemsPaint, setItemsHairCurtoCacheado, setItemsHairCurtoLiso,
  setItemsHairLongoCacheado, setItemsHairLongoOndulado, setItemsHairLongoLiso, setItemsEsprecoes,
  setItemsShirt, setItemsDress, esprecoesItens, setExpressaoAtual, onClose }) => {
  const titles = {
    hairMain: "Escolha o cabelo",
    hairGirl: "Escolha o cabelo",
    shirtMain: "Escolha a camiseta",
    dressMain: "Escolha o vestido",
    paints: "Escolha a calça",
    esprecao: "Escolha a expressão",
  };

  let wardrobeItems = [];

  if (selectedItem === "shirtMain") {
    wardrobeItems = guardaRoupaShirts;
  } else if (selectedItem === "paints") {
    wardrobeItems = guardaRoupaPaints;
  } else if (selectedItem === "hairGirl") {
    wardrobeItems = guardaRoupa;
  } else if (selectedItem === "hairMain") {
    wardrobeItems = guardaRoupaCabelo;
  } else if (selectedItem === 'esprecao') {
    wardrobeItems = esprecoesItens;
  } else if (selectedItem === 'dressMain') {
    wardrobeItems = guardaRoupaDress;
  }



  return (
    <div className="guarda-roupa" style={{ display: "flex" }}>
      <div className="containerTitle">
        <h4>{titles[selectedItem]}</h4>
      </div>
      <div className="containerImags">
        {wardrobeItems.map((item, index) => {
          // Verifica se o item é uma string (caso antigo) ou objeto (novo formato)
          const imageSrc = typeof item === 'string' ? item : item.src;
          const className = typeof item === 'string' ? '' : item.className || '';

          return (
            <div
              key={index}
              className={`img-container ${className}`}  // Adiciona a classe da expressão
              onClick={() => {
                if (selectedItem === 'paints') {
                  setItemsPaint({ paint: imageSrc });
                  setItemsDress({ dress: "" });
                }
                if (selectedItem === 'hairMain') {
                  if (imageSrc.startsWith(`${assetsPath}/hair/curto-cacheado/`)) {
                    setItemsHairCurtoCacheado({ hairCurtoCacheado: imageSrc });
                    setItemsHairCurtoLiso({ hairCurtoLiso: "" });
                    setItemsHairLongoCacheado({ hairLongoCacheado: "" });
                    setItemsHairLongoOndulado({ hairLongoOndulado: "" });
                    setItemsHairLongoLiso({ hairLongoLiso: "" });
                  }
                  if (imageSrc.startsWith(`${assetsPath}/hair/curto-liso/`)) {
                    setItemsHairCurtoLiso({ hairCurtoLiso: imageSrc });
                    setItemsHairCurtoCacheado({ hairCurtoCacheado: "" });
                    setItemsHairLongoCacheado({ hairLongoCacheado: "" });
                    setItemsHairLongoOndulado({ hairLongoOndulado: "" });
                    setItemsHairLongoLiso({ hairLongoLiso: "" });
                  }
                }

                if (selectedItem === 'hairGirl') {
                  if (imageSrc.startsWith(`${assetsPath}/hair/longo-cacheado/`)) {
                    setItemsHairLongoCacheado({ hairLongoCacheado: imageSrc });
                    setItemsHairCurtoCacheado({ hairCurtoCacheado: "" });
                    setItemsHairCurtoLiso({ hairCurtoLiso: "" });
                    setItemsHairLongoOndulado({ hairLongoOndulado: "" });
                    setItemsHairLongoLiso({ hairLongoLiso: "" });
                  }
                  else if (imageSrc.startsWith(`${assetsPath}/hair/longo-ondulado/`)) {
                    setItemsHairLongoOndulado({ hairLongoOndulado: imageSrc });
                    setItemsHairCurtoCacheado({ hairCurtoCacheado: "" });
                    setItemsHairCurtoLiso({ hairCurtoLiso: "" });
                    setItemsHairLongoCacheado({ hairLongoCacheado: "" });
                    setItemsHairLongoLiso({ hairLongoLiso: "" });
                  }
                  else if (imageSrc.startsWith(`${assetsPath}/hair/longo-liso/`)) {
                    setItemsHairLongoLiso({ hairLongoLiso: imageSrc });
                    setItemsHairCurtoCacheado({ hairCurtoCacheado: "" });
                    setItemsHairCurtoLiso({ hairCurtoLiso: "" });
                    setItemsHairLongoCacheado({ hairLongoCacheado: "" });
                    setItemsHairLongoOndulado({ hairLongoOndulado: "" });
                  }
                }
                else if (selectedItem === 'shirtMain') {
                  setItemsShirt({ shirt: imageSrc });
                  setItemsDress({ dress: "" });
                }
                else if (selectedItem === 'dressMain') {
                  setItemsDress({ dress: imageSrc });
                  setItemsShirt({ shirt: "" });
                  setItemsPaint({ paint: "" });
                }
                else if (selectedItem === 'esprecao') {
                  setItemsEsprecoes({ esprecoes: imageSrc });
                  setExpressaoAtual(className);
                }
                onClose();  // Fecha o guarda-roupa após a seleção

              }}
            >
              <img
                src={imageSrc}
                className="img-clothes"
                alt={`${titles[selectedItem]} ${index}`}
                onError={(e) => {
                  console.error("Erro ao carregar imagem:", imageSrc);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

};