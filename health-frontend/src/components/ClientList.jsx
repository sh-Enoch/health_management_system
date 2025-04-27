import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

function ClientList() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await api.get('clients/');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Name</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Gender</th>
              <th className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id}>
                <td className="py-2 px-4 border-b border-gray-200">{client.first_name} {client.last_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{client.gender}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  <Link 
                    to={`/profile/${client.id}`} 
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientList;