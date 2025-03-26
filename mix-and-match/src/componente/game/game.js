import './games.css';
import React, { useState } from 'react';

function Game() {
    const boneco = process.env.PUBLIC_URL + "/assets/bonecos/image.png";
    const cabeca = process.env.PUBLIC_URL + "/assets/faces/cabeca.png";
    const hairGirl = process.env.PUBLIC_URL + "/assets/hair/girl-hear-principal.png";
    const hairMAin = process.env.PUBLIC_URL + "/assets/hair/main-hear.png";
    const shirt = process.env.PUBLIC_URL + "/assets/shirsts/shirt-principal.png";
    const paints = process.env.PUBLIC_URL + "/assets/pants/pant-principal.png";

    // guarda roupa
    const guardaRoupa = [
        process.env.PUBLIC_URL + "/assets/guarda-roupa/image-1.png",
        process.env.PUBLIC_URL + "/assets/guarda-roupa/image-2.png",
        process.env.PUBLIC_URL + "/assets/guarda-roupa/image-3.png"
    ];


    const [showMain, setShowMain] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bgColor, setBgColor] = useState("rebeccapurple");

    // Atualizar para adicionar apenas o item específico

    const handleClick = (item) => {
        setSelectedItem(prevItem => (prevItem === item ? null : item)); // Alterna entre mostrar e ocultar
        setShowMain(true);
        if (item === cabeca) setBgColor("blue");
        else if (item === hairMAin) setBgColor("green");
        else if (item === hairGirl) setBgColor("pink");
        else if (item === shirt) setBgColor("red");
        else if (item === paints) setBgColor("yellow");
    };

    return (
        <div className="Game">
            <header className="Game-header">
                <main className={`game-main ${showMain ? "show" : ""}`}>
                    <section className="expressions">
                        <ul className="ul-expressions">
                            <li className="alegria"></li>
                            <li className="medo"></li>
                            <li className="raiva"></li>
                            <li className="nojo"></li>
                            <li className="tristesa"></li>
                        </ul>
                    </section>
                    <section className='doll'>
                        <img src={boneco} className="boneco-img" alt="img do boneco" />
                    </section>
                    <aside className='clothes'>
                        <h4>Escolha seu personagem</h4>
                        <ul>
                            <li onClick={() => handleClick(cabeca)}>
                                <img src={cabeca} className="cabeca-img" alt="img da cabeça" />
                            </li>
                            <hr />
                            <li onClick={() => handleClick(hairMAin)}>
                                <img src={hairMAin} className="hair-img" alt="img do cabelo" />
                            </li>
                            <hr />
                            <li onClick={() => handleClick(hairGirl)}>
                                <img src={hairGirl} className="hair-img" alt="img do cabelo" />
                            </li>
                            <hr />
                            <li onClick={() => handleClick(shirt)}>
                                <img src={shirt} className="shirt-img" alt="img shirt" />
                            </li>
                            <hr />
                            <li onClick={() => handleClick(paints)}>
                                <img src={paints} className="paints-img" alt="img paints" />
                            </li>
                        </ul>
                    </aside>
                    <div className="all-wardrobes">
                        {selectedItem === cabeca && (
                            <div className="guarda-roupa" style={{ display: 'flex' }}>
                           <div className='containerTitle'>
                                    <h4>Escolha a cabeça</h4>
                                </div>
                                <div className='containerImags'  style={{ backgroundColor: bgColor }}>
                                    {guardaRoupa.map((item, index) => (
                                        <img key={index} src={item} className="img-clothes" alt={`Cabeça ${index}`} />
                                    ))}
                                </div>
                                
                            </div>
              
                        )}

                        {selectedItem === hairMAin && (
                            <div className="guarda-roupa" style={{ display: 'flex' }}>
                           <div className='containerTitle'>
                                    <h4>Escolha o cabelo dele</h4>
                                </div>
                                <div className='containerImags'  style={{ backgroundColor: bgColor }}>
                                    {guardaRoupa.map((item, index) => (
                                        <img key={index} src={item} className="img-clothes" alt={`Cabelo Masculino ${index}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedItem === hairGirl && (
                            <div className="guarda-roupa" style={{ display: 'flex' }}>
                           <div className='containerTitle'>
                                    <h4>Escolha o cabelo dela</h4>
                                </div>
                                <div className='containerImags'  style={{ backgroundColor: bgColor }}>
                                    {guardaRoupa.map((item, index) => (
                                        <img key={index} src={item} className="img-clothes" alt={`Cabelo Feminino ${index}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedItem === shirt && (
                            <div className="guarda-roupa" style={{ display: 'flex' }}>
                           <div className='containerTitle'>
                                    <h4>Escolha a camiseta</h4>
                                </div>
                                <div className='containerImags'  style={{ backgroundColor: bgColor }}>
                                    {guardaRoupa.map((item, index) => (
                                        <img key={index} src={item} className="img-clothes" alt={`Camisa ${index}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {selectedItem === paints && (
                            <div className="guarda-roupa" style={{ display: 'flex' }}>
                           <div className='containerTitle'>
                                    <h4>Escolha a calça</h4>
                                </div>
                                <div className='containerImags'  style={{ backgroundColor: bgColor }}>
                                    {guardaRoupa.map((item, index) => (
                                        <img key={index} src={item} className="img-clothes" alt={`Calça ${index}`} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    
                </main >
            </header >
        </div >
    );
}

export default Game;
