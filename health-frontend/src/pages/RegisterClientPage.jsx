import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterClient from '../components/RegisterClient';

function RegisterClientPage() {
  const navigate = useNavigate();

  const handleSuccess = (client) => {
    navigate(`/profile/${client.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RegisterClient onSuccess={handleSuccess} />
    </div>
  );
}

export default RegisterClientPage;