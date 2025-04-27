import React from 'react';
import ProgramList from '../components/ProgramList';
import ClientList from '../components/ClientList';

function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-semibold mb-4">Available Programs</h2>
        <ProgramList />
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4">Client List</h2>
        <ClientList />
      </section>
    </div>
  );
}

export default Home;