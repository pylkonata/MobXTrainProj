import { ChangeEvent, useState, FormEvent } from 'react';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import styled from 'styled-components';

import { PostPreview } from '../types';

import store from '../store';
import SubHeader from './SubHeader';
import Button from './Button';
import { blue } from '@mui/material/colors';

const Form = styled.form`
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;
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
      <Form
        onSubmit={onSubmit}
      >
        <SubHeader color={blue[900]} fontSize={'1.5rem'}>New post</SubHeader>
        <StyledLabel>
          Title
          <input
            type="text"
            value={post.title}
            name='title'
            onChange={(e) => onChangePostValue(e)}
          />
        </StyledLabel>
        <StyledLabel>
          Post
          <textarea rows={10} cols={30} value={post.body} name='body' onChange={(e) => onChangePostValue(e)}></textarea>
        </StyledLabel>
        <Button
          primary
          type='submit'
          disabled={(!post.title || !post.body) ? true : false}
        >
          Add new post
        </Button>
      </Form>
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


