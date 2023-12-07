import { Container } from '@mui/material';

import Posts from './modules/PostManagement/components/Posts';
import AddPostForm from './modules/PostManagement/components/AddPostForm';
import UsersList from './modules/usersList/components/UsersList';

function App() {

  return (
    <Container >
      <UsersList/>
      <AddPostForm/>
      <Posts/>
    </Container>
  )
}

export default App;
