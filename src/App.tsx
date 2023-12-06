import { Container } from '@mui/material';

import Posts from './components/Posts';
import AddPostForm from './components/AddPostForm';
function App() {

  return (
    <Container >
      <AddPostForm/>
      <Posts/>
    </Container>
  )
}

export default App;
