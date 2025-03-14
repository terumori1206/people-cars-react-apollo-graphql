import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_PERSON, GET_PEOPLE } from '../graphql/queries';
import CarCard from './CarCard';
import { Card, Button } from 'antd';

const getStyles = () => ({
  list: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

const PersonCard = ({ person }) => {
  const styles = getStyles();

  const [deletePerson] = useMutation(DELETE_PERSON, {
    variables: { id: person.id },
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const cars = person.cars || [];
  console.log("Cars in PersonCard:", person.cars);

  return (
    <Card
      grid={{ gutter: 20, column: 1 }}
      style={styles.list}
      title={`${person.firstName} ${person.lastName}`}
      className="card"
    >
      {cars.length > 0 ? (
        cars.map((car) => <CarCard key={car.id} car={car} />)
      ) : (
        <p>No cars</p>
      )}
      <a href={`/people/${person.id}`} className="learn-more">Learn More</a>

      <div style={styles.buttonContainer}>
        <Button danger onClick={deletePerson}>
          Delete Person
        </Button>
      </div>
    </Card>
  );
};

export default PersonCard;

