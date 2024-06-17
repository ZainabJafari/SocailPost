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
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePosts } from "../../context/PostsContext";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {

  const [openUpdate, setOpenUpdate] = useState(false)
  const userId = parseInt(useLocation().pathname.split('/')[2]);
  const { currentUser } = useContext(AuthContext);

  const { user, fetchUser, fetchRelationship, relationship, addRelationship, removeRelationship } = usePosts();
   
  useEffect(() => {
    fetchUser(userId);
    fetchRelationship(userId);
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleFollow = () => {
    if (relationship.includes(currentUser.id)) {
      removeRelationship(userId);
    } else {
      addRelationship(userId);
    }
  };

  return (
    <div className="profile">
      <div className="images">
        <img src={user.coverPic} alt="" className="cover" />
        <img src={user.profilePic} alt="" className="profilePic" />
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
                <span>{user.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user.website || "N/A"}</span>
              </div>
            </div>
            {userId === currentUser.id ? (
              <button onClick={() => setOpenUpdate(true)}>Update</button>
            ) : (
              <button onClick={handleFollow}>
                {relationship.includes(currentUser.id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
        <Posts userId={userId} />
      </div>
{  openUpdate && <Update setOpenUpdate={setOpenUpdate} user={user} />}  </div>
  );
};

export default Profile;
