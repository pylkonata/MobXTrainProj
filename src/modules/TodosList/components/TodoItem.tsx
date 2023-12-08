import { useMutation, useQueryClient } from 'react-query';
import { ITodo } from '../types';
import { changeTodoStatus } from '../services';

type TodoItemProps = {
  todo: ITodo,
}
const TodoItem = ({ todo }: TodoItemProps) => {
  const client = useQueryClient();

  const {mutate: toggle} = useMutation({
    mutationFn: () => changeTodoStatus(todo.id, !todo.completed),
    onSuccess: (data) => {
      client.setQueryData(["todos", data.id], data),
      client.invalidateQueries(["todos"])
    },
  });

  return (
    <li><input type="checkbox" checked={todo.completed} onChange={()=>toggle()}/>
      {todo.title}
    </li>
  )
}

export default TodoItem;
