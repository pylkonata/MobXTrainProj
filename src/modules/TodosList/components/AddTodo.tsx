import { addTodo } from '../services';
import { useMutation, useQueryClient } from 'react-query';
import { Button, Form, Input } from 'antd';

type InputText = {
  todoText: string;
}
const AddTodo = () => {
  const [form] = Form.useForm();
  const todoText = Form.useWatch('todoText', form);
  const client = useQueryClient();

  const { mutate: createTodo } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      client.invalidateQueries(['todos']);
    },
  });

  const onSubmit = (values: InputText) => {
    console.log(values);
    console.log(form);
    if (todoText) {
      createTodo({
        id: Date.now(),
        completed: false,
        title: todoText,
      });
      form.resetFields();
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <Form
      form={form}
      name="form"
      style={{ display: 'flex', width: '100%' }}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="todoText"
        style={{ width: '80%' }}
        wrapperCol={{ span: '22' }}
      >
        <Input style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item >
        <Button
          type="primary"
          htmlType="submit"
          disabled={!todoText}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddTodo;
