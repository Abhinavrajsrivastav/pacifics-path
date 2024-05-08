import React, { useState, useContext } from 'react';
import './PopopForm.css';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { app } from '../Components/Firebase/Firebase';
import {AuthContext} from '../Components/Context/AuthProvider';

function PopupForm({ onClose, category }) {
    const dp = getFirestore(app);

    const { setUser, user } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        number: '',
        email: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    

    try {
        ///ye wali line problem kar rahi hai
        const newDocRef = doc(dp, `Domains`);
        // Set the data to the new  document  
        await setDoc(newDocRef, formData);
        console.log('User data stored in Firestore successfully');
    } catch (error) {
        console.error('Error storing user data in Firestore:', error);
    }

    // Clear form data and close popup
    setFormData({
        name: '',
        number: '',
        email: '',
    });
    onClose();
};


    return (
        <div className="popup-form">
            <div className="popup-form-inner">
                <button className="close-btn" onClick={onClose}>Close</button>
                <h2>Enter Your Details</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="number"
                        placeholder="Number"
                        value={formData.number}
                        onChange={handleInputChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default PopupForm;
