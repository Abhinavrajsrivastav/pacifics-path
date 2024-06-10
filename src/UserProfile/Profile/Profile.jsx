import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { AuthContext } from '../../Components/Context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../Components/Firebase/Firebase';
import { storage } from '../../Components/Firebase/Firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaUsers, FaCalendarAlt, FaPencilAlt, FaGlobeAmericas, FaBook, FaGem } from 'react-icons/fa';

function Profile() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { setUser, user, auth, data, setData } = useContext(AuthContext);

  const db = getFirestore(app);

  const name = user?.displayName;
  const email = user?.email;

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (name) {
      const imgListRef = ref(storage, `PIMG/${name}`);
      listAll(imgListRef).then((img) => {
        if (img.items.length > 0) {
          const lastFile = img.items[img.items.length - 1];
          getDownloadURL(lastFile).then((url) => {
            setProfileImage(url);
            setData({ ...data, photoURL: url });
          }).catch((error) => {
            console.error("Error getting profile image URL: ", error);
          });
        }
      }).catch((error) => {
        console.error("Error listing profile images: ", error);
      });
    }
  }, [name, setData, data]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && name) {
      const ImgRef = ref(storage, `PIMG/${name}/${v4()}`);
      try {
        await uploadBytes(ImgRef, file);
        const url = await getDownloadURL(ImgRef);
        setProfileImage(url);
        setData({ ...data, photoURL: url });
      } catch (error) {
        console.error("Error uploading profile image: ", error);
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-photo">
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <img src="/path/to/default-profile.png" alt="Default Profile" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="profile-info">
          <h2>{name}</h2>
          <p>Email: {email}</p>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/dummy" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://github.com/dummy" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://twitter.com/dummy" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://www.dummywebsite.com" target="_blank" rel="noopener noreferrer">
            <FaGlobe />
          </a>
        </div>
      </div>
      <div className="classRoom">
        <div className="joinClass">
          <Link to="/categories"><FaUsers size={50} /></Link>
          <p className="Join">Join a classroom</p>
        </div>
        <div className="ressumeClassRoom">
          <FaCalendarAlt size={50} />
          <p className="Join">Manage Your Day</p>
        </div>
        <div className="ressumeClassRoom">
          <Link to="/selfLearn"><FaPencilAlt size={50} /></Link>
          <p className="Join">Learn With Ai</p>
        </div>
        <div className="ressumeClassRoom">
          <FaGlobeAmericas size={50} />
          <p className="Join">Learn Globally</p>
        </div>
        <div className="ressumeClassRoom">
          <Link to="/read-books"><FaBook size={50} /></Link>
          <p className="Join">Read Books</p>
        </div>
        <div className="ressumeClassRoom">
          <FaGem size={50} />
          <p className="Join">Ask to Gemini</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
