// src/context/PostsContext.js
import React, { createContext, useContext, useState } from 'react';
import { makeRequest } from '../axios';

const PostsContext = createContext();

export const usePosts = () => {
  return useContext(PostsContext);
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const fetchPosts = async (userId) => {
    try {
      const response = await makeRequest.get('/posts', { params: { userId } });
      setPosts(response.data);
    } catch (error) {
      console.error('Failed to fetch posts', error);
    }
  };

  const createPost = async (newPost) => {
    try {
      const response = await makeRequest.post('/posts', newPost);
      setPosts((prevPosts) => [response.data, ...prevPosts]);
    } catch (error) {
      console.error('Failed to create post', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await makeRequest.get('/comments', { params: { postId } });
      setComments(response.data);
    } catch (error) {
    }
  }; 

  const createComment = async (newComment) => {
    try {
      const response = await makeRequest.post('/comments', newComment);
      setComments((prevComments) => [response.data, ...prevComments]);
    } catch (error) {
      console.error('Failed to create comment', error);
    }
  };


  return (
    <PostsContext.Provider value={{ posts, fetchPosts, createPost, createComment, comments, fetchComments}}>
      {children}
    </PostsContext.Provider>
  );
};
