import React, { useEffect, useState } from 'react';
import api from '../api/api';

function EnrollClient({ onSuccess }) {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    client: '',
    program: "",
    enrollment_date: new Date().toISOString().split('T')[0], // Default to today
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, programsRes] = await Promise.all([
          api.get('clients/'),
          api.get('programs/'),
        ]);
        setClients(clientsRes.data);
        setPrograms(programsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('enrollments/', {
        client: formData.client.id,
        program: formData.program.id,
        enrollment_date: formData.enrollment_date,
      });
      alert('Client enrolled successfully!');
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.error('Error enrolling client:', error);
      alert('Failed to enroll client');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Enroll Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Client</label>
          <select
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.first_name} {client.last_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Program</label>
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select a program</option>
            {programs.map(program => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Enrollment Date</label>
          <input
            type="date"
            name="enrollment_date"
            value={formData.enrollment_date}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Enroll Client
        </button>
      </form>
    </div>
  );
}

export default EnrollClient;