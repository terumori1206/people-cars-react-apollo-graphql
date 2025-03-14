import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../graphql/queries';
import PersonCard from '../components/PersonCard';
import PersonForm from '../components/PersonForm';
import CarForm from '../components/CarForm';

const Home = () => {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error fetching data</p>;
  }

  console.log("People data in Home:", data?.people || []);

  return (
    <div>
      <h2>People and their Cars</h2>
      <PersonForm />
      <h2>Add Car</h2>
      <CarForm people={data?.people || []} />
      <h2>Records</h2>
      <div>
        {data?.people?.length > 0 ? (
          data.people.map((person) => <PersonCard key={person.id} person={person} />)
        ) : (
          <p>No people found</p>
        )}
      </div>
    </div>
  );
};

export default Home;


