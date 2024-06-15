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
  const [likes, setLikes] = useState({});
  
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

  const deletePost = async (postId) => {
    try {
      await makeRequest.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  const fetchComments = async (postId) => {
    try {
      const response = await makeRequest.get('/comments', { params: { postId } });
      setComments(response.data);
    } catch (error) {
      console.error('Failed to fetch comments', error);
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


  const fetchLikes = async (postId) => {
    try {
      const response = await makeRequest.get('/likes', { params: { postId } });
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: response.data,
      }));
    } catch (error) {
      console.error('Failed to fetch likes', error);
    }
  };

  const addLike = async (postId) => {
    try {
      await makeRequest.post('/likes', { postId });
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: [...(prevLikes[postId] || []), postId],
      }));
    } catch (error) {
      console.error('Failed to add like', error);
    }
  };

  const removeLike = async (postId) => {
    try {
      await makeRequest.delete('/likes', { params: { postId } });
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: (prevLikes[postId] || []).filter((id) => id !== postId),
      }));
    } catch (error) {
      console.error('Failed to remove like', error);
    }
  };
  
  return (
    <PostsContext.Provider value={{ posts, fetchPosts, createPost, deletePost, createComment, comments, fetchComments, fetchLikes, likes, addLike, removeLike }}>
      {children}
    </PostsContext.Provider>
  );
};
