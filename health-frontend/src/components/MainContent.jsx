import { Outlet, Link } from 'react-router-dom';

export default function MainContent({ children }) {
  return (
    <div className="flex-1 overflow-auto">
      {/* Navigation bar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/register" className="hover:underline">Register Client</Link>
          <Link to="/enroll" className="hover:underline">Enroll Client</Link>
        </div>
      </nav>
      
      <div className="container mx-auto p-4">
        {/* Outlet renders the matched route */}
        <Outlet />
        {/* Children fallback (optional) */}
        {children}
      </div>
    </div>
  );
}