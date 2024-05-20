import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { horizontalLoop } from './horizontalLoop'; // Ensure the correct path
import './SelfLearn.css';

function SelfLearn() {
    useEffect(() => {
        const lines = gsap.utils.toArray('.stb_line_single');
        
        lines.forEach((line, i) => {
            const links = line.querySelectorAll("a");
            const tl = horizontalLoop(links, {
                repeat: -1,
                speed: 1 + i * 0.5,
                paddingRight: parseFloat(gsap.getProperty(links[0], "marginRight", "px"))
            });

            links.forEach(link => {
                const handleMouseEnter = () => tl.pause();
                const handleMouseLeave = () => tl.resume();

                link.addEventListener("mouseenter", handleMouseEnter);
                link.addEventListener("mouseleave", handleMouseLeave);

                return () => {
                    link.removeEventListener("mouseenter", handleMouseEnter);
                    link.removeEventListener("mouseleave", handleMouseLeave);
                };
            });
        });
    }, []);

    return (
        <div className="selfLearn-Page">
            <div className="services-ticker-block">
                <div className="stb_line_single">
                    <a href="#" className="stb-item"><span>Simple 1</span></a>
                    <a href="#" className="stb-item"><span>Simple 2</span></a>
                    <a href="#" className="stb-item"><span>Simple 3</span></a>
                </div>
            </div>
            <div className="services-ticker-block">
                <div className="stb_line_single">
                    <a href="#" className="stb-item"><span>Simple 8</span></a>
                    <a href="#" className="stb-item"><span>Simple 9</span></a>
                    <a href="#" className="stb-item"><span>Simple 10</span></a>
                    <a href="#" className="stb-item"><span>Simple 11</span></a>
                    <a href="#" className="stb-item"><span>Simple 12</span></a>
                    <a href="#" className="stb-item"><span>Simple 13</span></a>
                    <a href="#" className="stb-item"><span>Simple 14</span></a>
                    <a href="#" className="stb-item"><span>Simple 15</span></a>
                    <a href="#" className="stb-item"><span>Simple 13</span></a>
                    <a href="#" className="stb-item"><span>Simple 14</span></a>
                    <a href="#" className="stb-item"><span>Simple 15</span></a>
                </div>
            </div>
        </div>
    );
}

export default SelfLearn;
