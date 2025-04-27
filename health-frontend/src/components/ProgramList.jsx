import React, { useEffect, useState } from 'react';
import api from '../api/api';

function ProgramList() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get('programs/');
        setPrograms(response.data);
      } catch (err) {
        setError('Failed to load programs');
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <div className="p-4">Loading programs...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Health Programs</h1>
      {programs.length > 0 ? (
        <ul className="list-disc pl-5 space-y-2">
          {programs.map(program => (
            <li key={program.id}>
              <strong className="text-blue-600">{program.name}</strong>: {program.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No programs available</p>
      )}
    </div>
  );
}

export default ProgramList;