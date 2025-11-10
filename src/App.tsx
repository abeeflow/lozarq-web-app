import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProyectosPage from './pages/ProyectosPage';
import ProyectoDetallePage from './pages/ProyectoDetallePage';
import ServiciosPage from './pages/ServiciosPage';
import EstudioPage from './pages/EstudioPage';
import ContactoPage from './pages/ContactoPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminProjectsIndex from './pages/admin/projects/index';
import AdminProjectsCreate from './pages/admin/projects/create';
import AdminProjectsEdit from './pages/admin/projects/edit';
import AdminBookingsIndex from './pages/admin/bookings/index';

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark antialiased">
      {children}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/proyectos" element={<PublicLayout><ProyectosPage /></PublicLayout>} />
          <Route path="/proyecto/:id" element={<PublicLayout><ProyectoDetallePage /></PublicLayout>} />
          <Route path="/servicios" element={<PublicLayout><ServiciosPage /></PublicLayout>} />
          <Route path="/estudio" element={<PublicLayout><EstudioPage /></PublicLayout>} />
          <Route path="/contacto" element={<PublicLayout><ContactoPage /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/projects" element={<ProtectedRoute><AdminProjectsIndex /></ProtectedRoute>} />
          <Route path="/admin/projects/create" element={<ProtectedRoute><AdminProjectsCreate /></ProtectedRoute>} />
          <Route path="/admin/projects/:id/edit" element={<ProtectedRoute><AdminProjectsEdit /></ProtectedRoute>} />
          <Route path="/admin/bookings" element={<ProtectedRoute><AdminBookingsIndex /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
