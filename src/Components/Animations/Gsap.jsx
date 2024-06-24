import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export const gsapAnimations = () => {
  const visioIcons = document.querySelectorAll('.vision-icon');
  const visionImages = document.querySelectorAll('.vision-image');
  const visionHeading = document.querySelector('.vision-heading');
  const visionSubheading = document.querySelector('.vision-subheading');
  const visionBtn = document.querySelector('.vision-btn');
  const categories = document.querySelectorAll('.category');
  const brands = document.querySelectorAll('.brand-names');

  // Exclude visioIcons from rotation animation
  gsap.from(visioIcons, {
    opacity: 0,
    duration: 1,
    delay: 0.5,
    stagger: 0.2,
  });

  gsap.from(visionImages, {
    opacity: 0,
    y: 50,
    rotate: 360,
    duration: 1,
    delay: 0.8,
    stagger: 0.2,
  });

  gsap.from(visionHeading, {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.5,
  });

  gsap.from(brands, {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.5,
  });

  gsap.from(visionSubheading, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.8,
  });

  gsap.from(visionBtn, {
    opacity: 0,
    duration: 1,
    delay: 1,
  });

  gsap.from(categories, {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.8,
    stagger: 0.2,
  });
};
