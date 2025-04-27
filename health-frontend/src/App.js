import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Home from './pages/Home';
import RegisterClientPage from './pages/RegisterClientPage';
import EnrollClientPage from './pages/EnrollClientPage';
import ClientProfilePage from './pages/ClientProfilePage';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterClientPage />} />
            <Route path="/enroll" element={<EnrollClientPage />} />
            <Route path="/profile/:id" element={<ClientProfilePage />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;