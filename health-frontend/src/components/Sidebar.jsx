export default function Sidebar() {
    return (
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary-dark">HealthTrack Pro</h1>
        </div>
        <nav className="p-4">
          {[
            { name: 'Dashboard', icon: '🏠', path: '/' },
            { name: 'Clients', icon: '👥', path: '/clients' },
            { name: 'Programs', icon: '🏋️', path: '/programs' },
            { name: 'Reports', icon: '📊', path: '/reports' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="flex items-center p-3 rounded-lg hover:bg-primary-light hover:text-primary-dark mb-2 transition-colors"
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    );
  }