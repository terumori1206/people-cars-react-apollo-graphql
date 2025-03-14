import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_PERSON } from '../graphql/queries';
import { List, Typography } from 'antd';
import CarCard from '../components/CarCard';

const { Title } = Typography;

const getStyles = () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  personName: {
    alignSelf: 'flex-start',
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  list: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ShowPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const person = data.person;
  const styles = getStyles();

  return (
    <div style={styles.container}>
      <Title level={2} style={styles.personName}>{person.firstName} {person.lastName}</Title>
      <List
        grid={{ gutter: 16, column: 1 }} 
        style={styles.list}
        dataSource={person.cars}
        renderItem={(car) => (
          <List.Item style={{ width: '100%' }}>
            <CarCard car={car} />
          </List.Item>
        )}
      />
      <Link to="/">Go Back Home</Link>
    </div>
  );
};

export default ShowPage;