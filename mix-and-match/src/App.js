import Game from './componente/game/game';
import Hambiente from './componente/hambiente/page-hambiente';
import Home from './componente/home/home';
import { useState } from 'react';

function App() {
  const [screen, setScreen] = useState('home');
  const [selectedFundo, setSelectedFundo] = useState(null);
  const [selectedBoneco, setSelectedBoneco] = useState(null);
  const [selectedSkinColor, setSelectedSkinColor] = useState(null);


  return (
    <div className="App">
      {screen === 'home' && <Home onNavigate={() => setScreen('hambiente')} />}

      {screen === 'hambiente' && (
        <Hambiente
          onNavigateToGame={(fundo, boneco, skinColor) => {
            setSelectedFundo(fundo);
            setSelectedBoneco(boneco);
            setSelectedSkinColor(skinColor);
            setScreen('game');
          }}
        />

      )}

      {screen === 'game' && (
        <Game
          fundoSelecionado={selectedFundo}
          BonecoSelecionado={selectedBoneco}
          skinColor={selectedSkinColor}
          onNavigateBack={() => setScreen('hambiente')}
        />

      )}
    </div>
  );
}

export default App;
