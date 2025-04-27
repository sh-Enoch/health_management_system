import React from 'react';
import { useNavigate } from 'react-router-dom';
import EnrollClient from '../components/EnrollClient';

function EnrollClientPage() {
  const navigate = useNavigate();

  const handleSuccess = (enrollment) => {
    navigate(`/profile/${enrollment.client}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <EnrollClient onSuccess={handleSuccess} />
    </div>
  );
}

export default EnrollClientPage;