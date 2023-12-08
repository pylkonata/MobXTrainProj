import { useQuery } from 'react-query';

import { ITodo } from '../types';
import { getTodos } from '../services';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

const TodosList = () => {
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos
  })

  if (todosQuery.status === "loading") return <h1>Loading...</h1>
  if (todosQuery.status === "error") {
    return <h1>{JSON.stringify(todosQuery.error)}</h1>
  }
  
  return (
    <div style={{width: '100%'}}>
      <AddTodo/>
      <ul>
        {todosQuery.data.map((todo:ITodo) => (
          <TodoItem key={todo.id} todo={todo}/>
        ))}
      </ul>
    </div>
    
  )
}

export default TodosList;
