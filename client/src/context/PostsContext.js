// src/context/PostsContext.js
import React, { createContext, useContext, useState } from 'react';
import { makeRequest } from '../axios';
import axios from 'axios';
const PostsContext = createContext();

export const usePosts = () => {
  return useContext(PostsContext);
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [relationship, setRelationship] = useState([]);
  const [likes, setLikes] = useState({});
  
  const [user, setUser] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`, { withCredentials: true });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/users/${user.id}`, updatedUser, { withCredentials: true });
      setUser(response.data);
      console.log('User updated successfully');
    } catch (error) {
      console.error('Failed to update user', error);
      throw error;
    }
  };



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

/*   const deletePost = async (postId) => {
    try {
      await makeRequest.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  }; */

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

  const addLike = async (postId, userId) => {
    try {
      await makeRequest.post('/likes', { postId });
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: [...(prevLikes[postId] || []), userId],
      }));
    } catch (error) {
      console.error('Failed to add like', error);
    }
  };

  const removeLike = async (postId, userId) => {
    try {
      await makeRequest.delete('/likes', { params: { postId } });
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: (prevLikes[postId] || []).filter((id) => id !== userId),
      }));
    } catch (error) {
      console.error('Failed to remove like', error);
    }
  };

  const deletePost = async (postId) => {
    try {
      await makeRequest.delete(`/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post', error);
    }
  };

  const fetchRelationship = async (userId) => {
    try {
      const response = await axios.get('http://localhost:8000/api/relationships', { params: { userId } });
      setRelationship(response.data);
    } catch (error) {
      console.error('Failed to fetch relationship', error);
    }
  };
  
  const addRelationship = async (userId) => {
    try {
      await axios.post('http://localhost:8000/api/relationships', { userId });
      setRelationship((prev) => [...prev, userId]);
    } catch (error) {
      console.error('Failed to add relationship', error);
    }
  };
  
  const removeRelationship = async (userId) => {
    try {
      await axios.delete('http://localhost:8000/api/relationships', { params: { userId } });
      setRelationship((prev) => prev.filter((id) => id !== userId));
    } catch (error) {
      console.error('Failed to remove relationship', error);
    }
  };
  
  

  return (
    <PostsContext.Provider value={{ posts, fetchPosts, createPost, deletePost, createComment, comments, fetchComments, fetchLikes, likes, addLike, removeLike, fetchUser, user, fetchRelationship, relationship, addRelationship, removeRelationship, updateUser }}>
      {children}
    </PostsContext.Provider>
  );
};
