import { ChangeEvent, useState, FormEvent } from 'react';
import { Button, Alert, AlertTitle, Snackbar } from '@mui/material';

import { PostPreview } from '../types/post.types';

import store from '../store/post';

const AddPostForm = () => {
  const [post, setPost] = useState<PostPreview>({
    title: '',
    body: '',
  });
  const [successResponse, setSuccessResponse] = useState(false);

  const onChangePostValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target) {
      const { name, value } = e.target;
      console.log(name, value);
      setPost(prev => ({
        ...prev,
        [name]: value,
      }))
      
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    store.createPostRequest(post);
    setPost(prev => ({
      ...prev,
      title: '',
      body: '',
    }));
    setSuccessResponse(true);    
  };

  return (
    <>
      <form
        style={{ maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={onSubmit}
      >
        <h3>New post</h3>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Title
          <input
            type="text"
            value={post.title}
            name='title'
            onChange={(e)=>onChangePostValue(e)}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column' }}>
          Post
          <textarea rows={10} cols={30} value={post.body} name='body' onChange={(e)=>onChangePostValue(e)}></textarea>
        </label>
        <Button variant="text"
          size="small"
          type='submit'
          disabled={(!post.title || !post.body)? true : false}
        >
          Add new post
        </Button>
      </form>
      <Snackbar
        open={successResponse}
        autoHideDuration={5000}
        onClose={() => setSuccessResponse(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          <AlertTitle>Success</AlertTitle>
          the post was added!
        </Alert>
      </Snackbar>      
    </>
  )
}

export default AddPostForm;


