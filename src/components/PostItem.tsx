import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@mui/material";

import { IPost} from '../types/post.types';
import store from '../store/post';

type PostItemType = {
  post: IPost;
}

const PostItem = ({ post }: PostItemType) => {
  const handleDeletePost = ((id: number) => {
    store.deletePostRequest(id);    
  });

  const newPost = {
    userId: post.userId,
    id: post.id,
    title: 'new Title edited',
    body: 'some new text post'
  };

  const handleEditPost = () => {
    store.updatePostRequest(newPost);
    // store.patchPostRequest({ title: 'modified title' }, post.id);
    console.log(`${post.id} was edited`);
  };

  

  return (
    <Grid item xs={2} sm={4} md={4}>      
      <Card sx={{ height: '100%' }}>
				<CardContent>
					<Typography
						variant='h6'
						component='h3'
          >
						{`${post.id}: ${post.title}`}
					</Typography>
          <Typography variant='body1'>{post.body}</Typography>
				</CardContent>
				<CardActions>
					<Button
						variant="text"
						size="small"
						onClick={()=>handleDeletePost(post.id)}
          >
            Delete
					</Button>
					<Button
						variant="text"
						size="small"
						onClick={handleEditPost}
          >
            Edit
					</Button>
				</CardActions>
			</Card>
    </Grid>
  )
}

export default PostItem;
