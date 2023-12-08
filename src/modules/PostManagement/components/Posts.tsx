import { useEffect} from 'react';
import { observer } from 'mobx-react-lite'; 
import { Grid} from '@mui/material';

import store from '../store';
import PostItem from './PostItem';

const Posts = observer(() => {
  useEffect(() => {
    store.fetchPosts();    
  }, [])

  return (
    <>      
      <Grid container spacing={2} sx={{ p: '2rem' }}>
        {
          (store.posts.length === 0) ?
            'Loading' :
          (store.posts.map(post => {
            return (
              <PostItem post={post} key={post.id}/>
            )
          }))
        }
      </Grid>
    </>
  )
});

export default Posts;
