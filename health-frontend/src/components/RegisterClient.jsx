import React, { useState } from 'react';
import api from '../api/api';

function RegisterClient({ onSuccess }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: '',
    phone: '',
    date_of_birth: '',  // Matching Django model field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('clients/', formData);
      alert('Client registered successfully!');
      if (onSuccess) onSuccess(response.data);
    } catch (error) {
      console.error('Error registering client:', error);
      alert('Failed to register client');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register New Client</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">first_name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">last_name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
         <select >
          <option value=""> Select Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
         </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone_number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone_number}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register Client
        </button>
      </form>
    </div>
  );
}

export default RegisterClient;