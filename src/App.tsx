import { useState } from 'react';
import { Container } from '@mui/material';

import Posts from './modules/PostManagement/components/Posts';
import AddPostForm from './modules/PostManagement/components/AddPostForm';
import UsersList from './modules/usersList/components/UsersList';
import TodosList from './modules/TodosList/components/TodosList';

function App() {
  const [page, setPage] = useState(<Posts />)
  
  return (
    <Container >
      <div style={{margin: '1rem'}}>
        <button onClick={()=> setPage(<UsersList/>)}>Users List</button>
        <button onClick={()=> setPage(<Posts/>)}>Posts List</button>
        <button onClick={() => setPage(<AddPostForm />)}>Add new post</button>
        <button onClick={() => setPage(<TodosList />)}>Add todo</button>
      </div>
      {page}
    </Container>
  )
}

export default App;
