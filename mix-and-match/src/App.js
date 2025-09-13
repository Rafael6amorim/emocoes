import Game from './pages/game/game';
import Hambiente from './pages/environment/page-environment';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import RegisterPsicologo from './pages/register/register_psicolog';
import RegisterPaciente from './pages/register/register_paciente';
import Consultationpsychologist from './pages/consultation/consultation_psychologist';
import ConsultationPatients from './pages/consultation/consultation';
import { useState, useEffect } from 'react';

function App() {
  const [screen, setScreen] = useState('login');
  const [usuario, setUsuario] = useState(null);
  const [selectedFundo, setSelectedFundo] = useState(null);
  const [selectedBoneco, setSelectedBoneco] = useState(null);
  const [selectedSkinColor, setSelectedSkinColor] = useState(null);
  const [userId, setUserId] = useState(null);

  // Checa se já tem usuário no localStorage quando a app abre
  useEffect(() => {
    const user = localStorage.getItem("usuario");
    if (user) {
      const userData = JSON.parse(user);
      setUsuario(userData);
      setUserId(userData.id_usuario); // ← Também seta o userId aqui
      setScreen("home");
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUsuario(userData);
    setUserId(userData.id_usuario);
    localStorage.setItem("usuario", JSON.stringify(userData));
    setScreen("home");
  };

  const handleLogout = () => {
    setUsuario(null);
    setUserId(null); // ← Limpa o userId também
    localStorage.removeItem("usuario");
    setScreen("login");
  };

  const handleNavigateToPsychologists = () => {
    setScreen('consultation-psychologist');
  };
  const handleNavigateToPatients = () => {
    setScreen('consultation-patients');
  };

  return (
    <div className="App">
      {screen === 'login' && (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onNavigateToRegister={() => setScreen('register')}
        />
      )}

      {screen === 'register' && (
        <Register
          onRegisterSuccess={() => setScreen('login')}
        />
      )}

      {screen === 'home' && usuario && (
        <Home
          onNavigate={(selectedPaciente) => {
            if (selectedPaciente) {
              // Armazene o paciente selecionado se necessário
              console.log("Paciente selecionado:", selectedPaciente);
            }
            setScreen('hambiente');
          }}
          onLogout={handleLogout}
          userType={usuario.tipo_usuario}
          userId={userId}
          onNavigateToRegisterPsicologo={() => setScreen('register-psicologo')}
          onNavigateToRegisterPaciente={() => setScreen('register-paciente')}
          onNavigateToPsychologists={handleNavigateToPsychologists}
          onNavigateToPatients={handleNavigateToPatients}
        />
      )}

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

      {screen === 'register-psicologo' && (
        <RegisterPsicologo
          onRegisterSuccess={() => setScreen('home')}
        />
      )}

      {screen === 'register-paciente' && (
        <RegisterPaciente
          onRegisterSuccess={() => setScreen('home')}
        />
      )}

      {screen === 'consultation-psychologist' && (
        <Consultationpsychologist
          onNavigateBack={() => setScreen('home')}
          userId={userId}
        />
      )}

      {screen === 'consultation-patients' && (
        <ConsultationPatients
          onNavigateBack={() => setScreen('home')}
          userId={userId}
        />
      )}
    </div>
  );
}

export default App;