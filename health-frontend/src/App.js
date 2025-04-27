import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import RegisterClientPage from './pages/RegisterClientPage';
import EnrollClientPage from './pages/EnrollClientPage';
import ClientProfilePage from './pages/ClientProfilePage';

function App() {
  return (
    <Router>
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/register" className="hover:underline">Register Client</Link>
          <Link to="/enroll" className="hover:underline">Enroll Client</Link>
        </div>
      </nav>
      
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterClientPage />} />
          <Route path="/enroll" element={<EnrollClientPage />} />
          <Route path="/profile/:id" element={<ClientProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;