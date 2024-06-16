import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const userId = useLocation().pathname.split('/')[2];
  const [user, setUser] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users/${userId}`);
      setUser(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://instagram.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://twitter.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{user.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user.location || "N/A"}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.website || "N/A"}</span>
              </div>
            </div>
            <button>follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts userId={userId}/>
      </div>
    </div>
  );
};

export default Profile;
