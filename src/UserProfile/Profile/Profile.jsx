import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { AuthContext } from '../../Components/Context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { app, storage } from '../../Components/Firebase/Firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaUsers, FaPencilAlt, FaGooglePlusSquare, FaRegStar, FaUserFriends, FaGlobeAmericas, FaBook, FaGem, FaFilePdf, FaGoogle, FaLocationArrow } from 'react-icons/fa';
import Lottie from 'lottie-react';
import animationData from '../../Components/Animations/LottieAnimatedIcons/Animation - 1720296895562.json';

function Profile() {
  const { setUser, user, data, setData } = useContext(AuthContext);
  const navigate = useNavigate();
  const db = getFirestore(app);

  const name = user?.displayName;
  const email = user?.email;

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (name) {
        try {
          const imgListRef = ref(storage, `PIMG/${name}`);
          const img = await listAll(imgListRef);
          if (img.items.length > 0) {
            const lastFile = img.items[img.items.length - 1];
            const url = await getDownloadURL(lastFile);
            setProfileImage(url);
            setData({ ...data, photoURL: url });
          }
        } catch (error) {
          console.error("Error fetching profile image: ", error);
        }
      }
    };

    fetchProfileImage();
  }, [name, setData, data]);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file && name) {
      try {
        const ImgRef = ref(storage, `PIMG/${name}/${uuidv4()}`);
        await uploadBytes(ImgRef, file);
        const url = await getDownloadURL(ImgRef);

        // Immediately update UI with new image
        setProfileImage(url);
        setData({ ...data, photoURL: url }); // Update data object with new photoURL

      } catch (error) {
        console.error("Error uploading profile image: ", error);
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
      </div>
      <div className="profile-details">
        <div className="profile-photo">
          <div style={{ display: "flex", flexDirection: "row", alignItems: "end", gap: "10px" }}>
            <img src={profileImage || "/path/to/default-profile.png"} alt="Profile" />
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <h2>{name}</h2>
          </div>
        </div>
        <div className='editProfile'>
          <button onClick={() => navigate("/edit-profile")}>Edit Profile</button>
        </div>
        <div className="profile-info">
          <p>Profession: Software Engineer</p>
          <p>Email: {email}</p>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/dummy" target="_blank" rel="noopener noreferrer">
            <FaLocationArrow />
          </a>
          <a href="https://www.linkedin.com/in/dummy" target="_blank" rel="noopener noreferrer">
            <FaGoogle />
          </a>
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
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ height: '100px', width: '100px' }}
        />
      </div>
      <div className="classRoom">
        <div className="ressumeClassRoom">
          <Link to="/selfLearn"><FaPencilAlt size={30} color='white' /></Link>
          <p className="Join">Learn With Ai</p>
        </div>
        <div className="ressumeClassRoom">
          <Link to="/read-books"><FaBook size={30} color='white' /></Link>
          <p className="Join">Read Books</p>
        </div>
        <div className="ressumeClassRoom">
          <FaRegStar size={30} />
          <p className="Join">Leaderboard</p>
        </div>
        <div className="ressumeClassRoom">
          <FaGooglePlusSquare size={30} />
          <p className="Join">Ask to Gemini</p>
        </div>
        <div className="ressumeClassRoom">
          <Link to="/git-mate"><FaUserFriends size={30} color='white' /></Link>
          <p className="Join">Find Mate</p>
        </div>
        <div className="ressumeClassRoom">
          <p className="Join">GitHub</p>
        </div>
        <div className="joinClass">
          <Link to="/categories"><FaUsers size={30} color='white' /></Link>
          <p className="Join">Join a classroom</p>
        </div>
        <div className="joinClass">
          <Link to="/PdfScanner"><FaFilePdf size={30} color='white' /></Link>
          <p className="Join">Chat with Pdf</p>
        </div>
        <div className="ressumeClassRoom">
          <FaGlobeAmericas size={30} />
          <p className="Join">Learn Globally</p>
        </div>
        <div className="ressumeClassRoom">
          <FaGem size={30} color='white' />
          <p className="Join">LeetCode</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
