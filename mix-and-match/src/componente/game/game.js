
import './games.css';

function Game() {
    const boneco = process.env.PUBLIC_URL + "/assets/bonecos/image.png";
    const cabeca = process.env.PUBLIC_URL + "/assets/faces/cabeca.png";
    const hairGirl = process.env.PUBLIC_URL + "/assets/hair/girl-hear-principal.png";
    const hairMAin = process.env.PUBLIC_URL + "/assets/hair/main-hear.png";
    const shirt = process.env.PUBLIC_URL + "/assets/shirsts/shirt-principal.png";
    const paints = process.env.PUBLIC_URL + "/assets/pants/pant-principal.png";



    return (
        <div className="Game">
            <header className="Game-header">
                <main className="game-main">
                    <section className="expressions">
                        <ul className="ul-expressions">
                            <li className= "alegria"></li>
                            <li className= "medo"></li>
                            <li className= "raiva"></li>
                            <li className= "nojo"></li>
                            <li className= "tristesa"></li>
                        </ul>
                    </section>
                    <section className='doll'>
                        <img src={boneco} className="boneco-img" alt="img do boneco"></img>
                    </section>
                    <aside className='clothes'>
                        <h4>Escolha seu personagem</h4>
                        <ul>
                            <li>  <img src={cabeca} className="cabeca-img" alt="img da cabeça"></img></li>
                            <hr></hr>
                            <li>  <img src={hairMAin} className="hair-img" alt="img do cabelo"></img></li>
                            <hr></hr>
                            <li>  <img src={hairGirl} className="hair-img" alt="img do cabelo"></img></li>
                            <hr></hr>
                            <li>  <img src={shirt} className="shirt-img" alt="img shirt "></img></li>
                            <hr></hr>
                            <li>  <img src={paints} className="paints-img" alt="img paints"></img></li>
                        </ul>
                    </aside>
                </main>
            </header>
        </div>
    );
}

export default Game;