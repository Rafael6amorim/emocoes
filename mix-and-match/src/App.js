import Game from './pages/game/game';
import Hambiente from './pages/environment/page-environment';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Register from './pages/register/register';
import RegisterPsicologo from './pages/register/register_psicolog';
import RegisterPaciente from './pages/register/register_paciente';
import Consultationpsychologist from './pages/consultation/consultation_psychologist';
import ConsultationPatients from './pages/consultation/consultation';
import ConsultationImages from './pages/consultation/consultation_images';
import { useState, useEffect } from 'react';

function App() {
  const [screen, setScreen] = useState('login');
  const [usuario, setUsuario] = useState(null);
  const [paciente, setPaciente] = useState(null)
  const [selectedFundo, setSelectedFundo] = useState(null);
  const [selectedBoneco, setSelectedBoneco] = useState(null);
  const [selectedSkinColor, setSelectedSkinColor] = useState(null);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
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

  const handleNavigateToConsultationImages = (consultaId = null) => {
    setConsultaSelecionada(consultaId);
    setScreen('consultation-images');
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
          onCancel={() => setScreen('login')}
        />
      )}

      {screen === 'home' && usuario && (
        <Home
          onNavigate={(selectedPaciente) => {
            if (selectedPaciente) {
              // Armazene o paciente selecionado se necessário
              console.log("Paciente selecionado:", selectedPaciente);
              setPaciente(selectedPaciente)
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
          handleNavigateToConsultationImages={handleNavigateToConsultationImages}
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
          paciente={paciente}
          handleNavigateToConsultationImages={handleNavigateToConsultationImages}
          userId={userId}
        />
      )}

      {screen === 'consultation-images' && (
        <ConsultationImages
          onNavigateBack={() => setScreen('home')}
          userId={userId}
          consultaId={consultaSelecionada}
        />
      )}

      {screen === 'register-psicologo' && (
        <RegisterPsicologo
          onRegisterSuccess={() => setScreen('home')}
          onCancel={() => setScreen('home')}
        />
      )}

      {screen === 'register-paciente' && (
        <RegisterPaciente
          onRegisterSuccess={() => setScreen('home')}
          onCancel={() => setScreen('home')}
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