import { useMutation } from '@apollo/client';
import { Form, Input, Button } from 'antd';
import { UPDATE_PERSON, GET_PEOPLE } from '../../graphql/queries';

const UpdatePerson = ({ id, firstName, lastName, onButtonClick }) => {
  const [form] = Form.useForm();

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const onFinish = (values) => {
    updatePerson({
      variables: {
        id,
        firstName: values.firstName,
        lastName: values.lastName
      }
    });
    onButtonClick();
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish} initialValues={{ firstName, lastName }}>
      <Form.Item name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="lastName" rules={[{ required: true, message: 'Please enter last name' }]}>
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Save</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdatePerson;
