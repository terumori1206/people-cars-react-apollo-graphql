import { useMutation } from '@apollo/client';
import { UPDATE_PERSON, GET_PEOPLE } from '../graphql/queries';
import { Button, Form, Input } from 'antd';

const UpdatePerson = ({ id, firstName, lastName, onButtonClick }) => {
  const [form] = Form.useForm();

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }]
  });

  const onFinish = (values) => {
    updatePerson({ variables: { id, ...values } });
    onButtonClick();
  };

  return (
    <Form
      layout="inline"
      size="large"
      form={form}
      onFinish={onFinish}
      initialValues={{ firstName, lastName }}
    >
      <Form.Item name="firstName">
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item name="lastName">
        <Input placeholder="Last Name" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Save</Button>
    </Form>
  );
};

export default UpdatePerson;
