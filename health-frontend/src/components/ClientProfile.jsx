import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/api';

function ClientProfile() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const [clientRes, enrollmentsRes] = await Promise.all([
          api.get(`clients/${id}/`),
          api.get(`enrollments/?client=${id}`),
        ]);
        setClient(clientRes.data);
        setEnrollments(enrollmentsRes.data);
      } catch (error) {
        console.error('Error fetching client data:', error);
      }
    };

    fetchClientData();
  }, [id]);

  if (!client) return <div className="p-4">Loading client data...</div>;

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{client.name}'s Profile</h1>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{client.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p>{client.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p>{client.date_of_birth || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Program Enrollments</h2>
        {enrollments.length > 0 ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrollment Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enrollments.map(enrollment => (
                  <tr key={enrollment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link 
                        to={`/programs/${enrollment.program.id}`} 
                        className="text-blue-600 hover:text-blue-800"
                      >
                        {enrollment.program.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{enrollment.enrollment_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {enrollment.completion_date ? 'Completed' : 'Active'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No enrollments found.</p>
        )}
      </div>
    </div>
  );
}

export default ClientProfile;