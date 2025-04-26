import Game from './componente/game/game';
import Hambiente from './componente/hambiente/page-hambiente';
import Home from './componente/home/home';
import { useState } from 'react';

function App() {
  const [screen, setScreen] = useState('home'); // agora controla 3 telas: home, hambiente, game
  const [selectedFundo, setSelectedFundo] = useState(null);

  return (
    <div className="App">
      {screen === 'home' && <Home onNavigate={() => setScreen('hambiente')} />}
      {screen === 'hambiente' && (
        <Hambiente 
          onNavigateToGame={(selectedImage) => {
            setSelectedFundo(selectedImage);
            setScreen('game');
          }}
        />
      )}
      {screen === 'game' && (
        <Game
          fundoSelecionado={selectedFundo}
          onNavigateBack={() => setScreen('home')}
        />
      )}
    </div>
  );
}

export default App;
