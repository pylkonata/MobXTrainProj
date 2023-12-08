import { FormEvent, useState } from 'react'
import { addTodo } from '../services';
import { useMutation, useQueryClient } from 'react-query';

const AddTodo = () => {
  const [todoText, setTodoText] = useState('');
  const client = useQueryClient();

  const { mutate: createTodo } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      client.invalidateQueries(['todos']);
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText) {      
      createTodo({
        id: Date.now(),
        completed: false,
        title: todoText,
      });
      setTodoText('');
    }
  }
  return (
    <form onSubmit={onSubmit}>
        <input
          type="text"
          value={todoText}
          name='todoText'
          style={{ width: '80%' }}
          onChange={(e)=>setTodoText(e.target.value)}
        />
        <button type='submit' disabled={todoText? false : true}>Add todo</button>
      </form>
  )
}

export default AddTodo;
