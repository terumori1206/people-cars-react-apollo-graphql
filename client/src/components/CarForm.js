import { useMutation } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';

import { ADD_CAR, GET_PEOPLE } from '../graphql/queries';

const { Option } = Select;

const CarForm = ({ people = [] }) => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addCar] = useMutation(ADD_CAR);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;

    addCar({
      variables: {
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId: String(personId),
      },
      update: (cache, { data: { addCar } }) => {
        const existingData = cache.readQuery({ query: GET_PEOPLE });

        if (!existingData || !existingData.people) {
          console.error("Can't Fetch GraphQL Data!!");
          return;
        }

        const updatedPeople = existingData.people.map((person) => {
          if (person.id === personId) {
            return {
              ...person,
              cars: person.cars ? [...person.cars, addCar] : [addCar],
            };
          }
          return person;
        });

        cache.writeQuery({
          query: GET_PEOPLE,
          data: { people: updatedPeople },
        });
      },
    });

    form.resetFields();
  };

  return (
    <Form
      name="add-car-form"
      layout="horizontal"
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "30px",
        width: "100%",
        maxWidth: "800px",
      }}
      form={form}
      onFinish={onFinish}
    >

      <Form.Item label="Year :" name="year" rules={[{ required: true, message: 'Please enter the year' }]}>
        <Input type="text" placeholder="Year" style={{ width: 80 }} />
      </Form.Item>
      <Form.Item label="Make :" name="make" rules={[{ required: true, message: 'Please enter the make' }]}>
        <Input placeholder="Make" style={{ width: 100 }} />
      </Form.Item>
      <Form.Item label="Model :" name="model" rules={[{ required: true, message: 'Please enter the model' }]}>
        <Input placeholder="Model" style={{ width: 100 }} />
      </Form.Item>
      <Form.Item label="Price :" name="price" rules={[{ required: true, message: 'Please enter the price' }]}>
        <Input placeholder="Price" style={{ width: 100 }} prefix="$" />
      </Form.Item>
      <Form.Item label="Person :" name="personId" rules={[{ required: true, message: 'Please select a person' }]}>
        <Select placeholder="Select a person" style={{ width: 100 }}>
          {people.length > 0 ? (
            people.map((person) => (
              <Option key={person.id} value={person.id}>
                {person.firstName} {person.lastName}
              </Option>
            ))
          ) : (
            <Option disabled>No data</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CarForm;


