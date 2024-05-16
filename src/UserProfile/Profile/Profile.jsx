import React, { useContext, useEffect, useRef, useState } from 'react';
import './Profile.css';
import { AuthContext } from '../../Components/Context/AuthProvider';
import { useNavigate,Link } from 'react-router-dom';
import { doc, setDoc, getFirestore, getDoc } from 'firebase/firestore';
import { app } from '../../Components/Firebase/Firebase';
import { storage } from '../../Components/Firebase/Firebase';
import {getDownloadURL, listAll, ref, uploadBytes} from 'firebase/storage';
import {v4} from "uuid";

function Profile() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { setUser, user, auth, data, setData } = useContext(AuthContext);

  const db = getFirestore(app);

  const name = user?.displayName;
  const email = user?.email;
  console.log(user);
  

  // State to hold the selected profile image
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    listAll(ref(storage, `PIMG/${name}`)).then(img => {
      console.log(img); 
      img.items.forEach(val => {
       const lastFile = img.items[img.items.length - 1];
      //  console.log(lastFile);
       
        getDownloadURL(lastFile).then((url) => {
          setProfileImage(url);
          setData({...data,photoURL: url});
        });
      });
    }
    );
  }, []);

  // Function to handle profile image upload
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    const ImgRef = ref(storage, `PIMG/${name}/${v4()}`);
    await uploadBytes(ImgRef, file);
  };

  return (
    <div className="profile-container">
      <div className="profile-details">
        <div className="profile-photo">
          {/* Display the selected profile image */}
          {profileImage ? (
            <img src={profileImage} alt="Profile" />
          ) : (
            <img src={profileImage} alt="Default Profile" />
          )}
          {/* Input field for selecting a new profile image */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className="profile-info">
          <h2>{name}</h2>
          <p>Email: {email}</p>
        </div>
      </div>
      <div className="classRoom">
        <div className="joinClass">
          <Link to="/categories"><img src="./Icons/group.png" alt="" /></Link>
          <p className="Join">Join a classroom</p>
        </div>
        <div className="ressumeClassRoom">
          <img src="./Icons/add.png" alt="" />
          <p className="Join">Explore</p>
        </div>
         <div className="ressumeClassRoom">
          <Link to="/selfLearn"><img src="./Icons/self-learning.png" alt="" /></Link>
          <p className="Join">Self Learning</p>
        </div>
         <div className="ressumeClassRoom">
          <img src="./Icons/video-call.png" alt="" />
          <p className="Join">Group Learning</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
