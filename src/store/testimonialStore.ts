import { create } from 'zustand';
import { Testimonial } from '../types';
import aditya from './aditya.jpg';
import { p } from 'framer-motion/client';
import prathmesh from './prathmesh.png';

interface TestimonialState {
  testimonials: Testimonial[];
  currentIndex: number;
  nextTestimonial: () => void;
  prevTestimonial: () => void;
  setTestimonial: (index: number) => void;
}

const testimonialData: Testimonial[] = [
  {
    "id": "1",
    "name": "Aditya Goyal",
    "position": "Web Development Team Lead",
    "company": "Cyberonites",
    "testimonial": "Anshumesh's frontend expertise and eye for design made a huge impact on our projects. His ability to create visually stunning and highly interactive interfaces is outstanding.",
    "image": aditya,
    "rating": 5
  },
  {
    "id": "2",
    "name": "Parthemesh Saini",
    "position": "Software Eng.",
    "company": "Self-Employed",
    "testimonial": "Working with Anshumesh on various freelance projects has been an amazing experience. His problem-solving skills and ability to implement efficient solutions make him a valuable collaborator.",
    "image": prathmesh,
    "rating": 5
  },
  {
    "id": "3",
    "name": "Sarthak Bansal",
    "position": "Hackathon Team Member",
    "company": "Hackathon Project",
    "testimonial": "During our hackathon, Anshumesh played a key role in ensuring we delivered a high-quality, functional prototype. His ability to work under pressure and write clean, scalable code was truly impressive.",
    "image": "https://imgs.search.brave.com/uezoezsyT18Zmf2kGpFt8d3IBvj8G_PRNHV21OLGDFM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS12ZWN0/b3IvY2hhcmFjdGVy/LWF2YXRhci1pc29s/YXRlZF83MjkxNDkt/MTk0ODAxLmpwZz9z/ZW10PWFpc19pdGVt/c19ib29zdGVkJnc9/NzQw",
    "rating": 5
  }
];

export const useTestimonialStore = create<TestimonialState>((set) => ({
  testimonials: testimonialData,
  currentIndex: 0,
  nextTestimonial: () => set((state) => ({
    currentIndex: (state.currentIndex + 1) % state.testimonials.length,
  })),
  prevTestimonial: () => set((state) => ({
    currentIndex: (state.currentIndex - 1 + state.testimonials.length) % state.testimonials.length,
  })),
  setTestimonial: (index) => set({ currentIndex: index }),
}));