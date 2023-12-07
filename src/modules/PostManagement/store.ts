import { makeAutoObservable, autorun} from "mobx";
import { IPost, PostPreview, ModifiedFields } from "./types";
import { BASE_URL } from "../../constants";
class Post {
  posts: IPost[] = [];
  constructor() {
    makeAutoObservable(this);
    autorun(() => {
      console.log('posts: ', JSON.stringify(this.posts.length))
    })
  }


  setPosts(newPosts: IPost[]) {
    this.posts = [...newPosts];
  }
  
  addNewPost(newPost: IPost) {
    this.posts.push(newPost);
  }
  
  updatePost(newPost: IPost) {
    if (this.posts.length > 0) {
      this.posts = this.posts.map(post => {
        if (post.id === newPost.id) return newPost;
        return post;
      });
    }
  };
  modifyPostField(field: ModifiedFields, id: number) {
    let post = this.posts.find(post => post.id === id);
    if (post) {
      post = { ...post, ...field };      
    }
    console.log(post);
  }

  fetchPosts() {
    fetch(`${BASE_URL}/posts`)
      .then((response) => response.json())
      .then(json => {
        this.setPosts(json);
      })
      .catch(err => console.log(err));
  }
  deletePostRequest(id: number) {
    fetch(`${BASE_URL}/posts/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          this.setPosts(this.posts.filter(post => post.id !== id));          
          console.log(`${id} was deleted`);
        }
      })
      .catch(err => console.log(err));
  }

  createPostRequest(post: PostPreview, userId = 1) {
    const newPost = { ...post, userId };

    fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.addNewPost(data);
      })
      .catch(err => console.log(err));
  }

  updatePostRequest(post: IPost) {
    fetch(`${BASE_URL}/posts/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        this.updatePost(data);
      })
      .catch(err => console.log(err));
  }

  patchPostRequest(field: ModifiedFields, id: number) {
    fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(field),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => this.updatePost(data))
    .catch(err => console.log(err));
  }
}


export default new Post();
