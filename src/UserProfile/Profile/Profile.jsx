import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { AuthContext } from '../../Components/Context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import { app } from '../../Components/Firebase/Firebase';
import { storage } from '../../Components/Firebase/Firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

function Profile() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { setUser, user, auth, data, setData } = useContext(AuthContext);

  const db = getFirestore(app);

  const name = user?.displayName;
  const email = user?.email;

  // State to hold the selected profile image
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

  // Function to handle profile image upload
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
          {/* Display the selected profile image */}
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <img src="/path/to/default-profile.png" alt="Default Profile" />
          )}
          {/* Input field for selecting a new profile image */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="profile-info">
          <h2>{name}</h2>
          <p>Email: {email}</p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/dummy" target="_blank" rel="noopener noreferrer"></a></p>
          <p>LeetCode: <a href="https://leetcode.com/dummy" target="_blank" rel="noopener noreferrer"></a></p>
          <p>Website: <a href="https://www.dummywebsite.com" target="_blank" rel="noopener noreferrer"></a></p>
          <p>Bio:</p>
          <p>Address:</p>
        </div>
      </div>
      <div className="classRoom">
        <div className="joinClass">
          <Link to="/categories"><img src="./Icons/group.png" alt="" /></Link>
          <p className="Join">Join a classroom</p>
        </div>
        <div className="ressumeClassRoom">
          <img src="./Icons/planning.png" alt="" />
          <p className="Join">Manage Your Day</p>
        </div>
        <div className="ressumeClassRoom">
          <Link to="/selfLearn"><img src="./Icons/pencil.png" alt="" /></Link>
          <p className="Join">Learn With Ai</p>
        </div>
        <div className="ressumeClassRoom">
          <img src="./Icons/global-education.png" alt="" />
          <p className="Join">Learn Globally</p>
        </div>
        <div className="ressumeClassRoom">
       <Link to="/read-books"><img src="./Icons/reading.png" alt="" /></Link>
          <p className="Join">Read Books</p>
        </div>
        <div className="ressumeClassRoom">
          <img src="./Icons/gemini.png" alt="" />
          <p className="Join">Ask to Gemini</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
