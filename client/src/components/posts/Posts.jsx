// src/components/posts/Posts.jsx
import React, { useEffect } from 'react';
import Post from '../post/Post';
import './posts.scss';
import { usePosts } from '../../context/PostsContext';

const Posts = ({ userId }) => {
  const { posts, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts(userId);
  }, [userId, fetchPosts]);

  return (
    <div className="posts">
      {posts.length === 0
        ? 'Loading...'
        : posts.map((post) => <Post post={post} key={post.id} />)}
    </div>
  );
};

export default Posts;
