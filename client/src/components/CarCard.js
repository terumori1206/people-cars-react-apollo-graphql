import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CAR, UPDATE_CAR, GET_PEOPLE } from '../graphql/queries';
import { Card, Button, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const getStyles = () => ({
  card: {
    width: '100%',
    marginBottom: '16px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    // flexDirection: 'column',
  },
  text: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '10px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  icon: {
    cursor: 'pointer',
    fontSize: '18px',
  },
});

const CarCard = ({ car }) => {
  const styles = getStyles();
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const [deleteCar] = useMutation(DELETE_CAR, {
    variables: { id: car.id },
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const onFinish = (values) => {
    updateCar({
      variables: {
        id: car.id,
        ...values,
        price: parseFloat(values.price),
        year: parseInt(values.year),
      },
    });
    setEditMode(false);
  };

  console.log('Car data in CarCard:', car);

  return (
    <Card style={{ width: "100%", margin: "10px auto", padding: "10px" }}>
      {editMode ? (
        <Form layout="vertical" form={form} onFinish={onFinish} initialValues={{
          year: car.year,
          make: car.make,
          model: car.model,
          price: car.price,
        }} style={styles.form}>
          <Form.Item name="year" label="Year">
            <Input placeholder="Year" />
          </Form.Item>
          <Form.Item name="make" label="Make">
            <Input placeholder="Make" />
          </Form.Item>
          <Form.Item name="model" label="Model">
            <Input placeholder="Model" />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input placeholder="Price" prefix="$" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>Save</Button>
        </Form>
      ) : (
        <>
          <p style={styles.text}>{`${car.year} ${car.make} ${car.model} -> $${car.price.toLocaleString()}`}</p>
          <div style={styles.actions}>
            <EditOutlined onClick={handleEditClick} style={styles.icon} />
            <DeleteOutlined onClick={deleteCar} style={{ ...styles.icon, color: 'red' }} />
          </div>
        </>
      )}
    </Card>
  );
};

export default CarCard;
