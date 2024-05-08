import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Categories.css';
import { useEffect } from 'react';
import { Scrollreveal } from "../Components/Animations/Scrollreveal";
import { gsapAnimations } from "../Components/Animations/Gsap";
import PopupForm from './PopopForm';

function Categories() {

    const [form, setForm] = useState(false);
    const [category,setCategory] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        Scrollreveal();
    }, []);

    function toggleForm(category) {
        // console.log(category); 
        setCategory(category); 
        setForm(!form);
    }

    function onClose() {
        setForm(false);
    }

    const categories = [
        "Physics", "Math", "Chemistry", "Biology", "History",
        "Geography", "Literature", "Music", "Art", "Sport",
        "Cinema", "Theatre", "TV", "Video Games", "Comics",
        "Manga", "Anime", "Fashion", "Cooking", "DIY",
        "Travel", "Photography", "Science", "Technology",
        "Programming", "Languages"
    ];

    return (
        <div className="Categories-container">
            <div className="category-head">
                <h1>Choose what excites you</h1>
                <img src="./Icons/checklist.png" alt="" />
            </div>
            <div className={`categories-body ${form ? 'form-open' : ''}`}>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category ${category.replace(/\s/g, '')}`}
                        style={{ backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}` }}
                        onClick={() => toggleForm(category)} // Corrected onClick event handler
                    >
                        {category}
                    </div>
                ))}
            </div>
            <div className="form-container">
                {form && <PopupForm onClose={onClose} category={category} />}
            </div>
        </div>
    );
}

export default Categories;
