// src/components/share/Share.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { usePosts } from '../../context/PostsContext';
import './share.scss';
import { makeRequest } from '../../axios';

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState('');
  const { currentUser } = useContext(AuthContext);
  const { createPost } = usePosts();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post("/upload", formData);
      console.log("Upload response:", res.data);
      return res.data;
    } catch (error) {
      console.error('Failed to upload file', error);
      return "";
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
    }
    await createPost({ desc, img: imgUrl });
    console.log(imgUrl)
    setDesc("");
    setFile(null);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + currentUser.profilePic} alt="" />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
