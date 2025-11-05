import { BrowserRouter as Router, Routes, Route , NavLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProyectosPage from './pages/ProyectosPage';
import ServiciosPage from './pages/ServiciosPage';
import EstudioPage from './pages/EstudioPage';
import ContactoPage from './pages/ContactoPage';

function App() {
  return (
    <Router>
      <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark antialiased">
        
         

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/estudio" element={<EstudioPage />} />
          <Route path="/contacto" element={<ContactoPage />} />
        </Routes>
      </div>

     
    </Router>

    
  );
}

export default App;
