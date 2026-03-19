import { create } from 'zustand';
import { Testimonial } from '../types';
import aditya from './aditya.jpg';
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
    "image": "https://imgs.search.brave.com/C9CmRhDLpUbkeUGOhSZzar4g4g_b7BkwTQb4gP_geyA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jNS5y/Z3N0YXRpYy5uZXQv/bS80MTU0NDc1Njc2/NjEyNTYvaW1hZ2Vz/L3N5bWJvbHMvc3Zn/L2NsYXNzaWZpY2F0/aW9uLWNvcnBvcmF0/ZS5zdmc",
    "rating": 5
  },
  {
    "id": "4",
    "name": "Arjun Sharma",
    "position": "CEO",
    "company": "Mediaonstake",
    "testimonial": "As our Technical Lead, Anshumesh demonstrated exceptional foresight and deep technical knowledge. He transformed our development process and delivered a platform that exceeded our expectations.",
    "image": "https://imgs.search.brave.com/C9CmRhDLpUbkeUGOhSZzar4g4g_b7BkwTQb4gP_geyA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jNS5y/Z3N0YXRpYy5uZXQv/bS80MTU0NDc1Njc2/NjEyNTYvaW1hZ2Vz/L3N5bWJvbHMvc3Zn/L2NsYXNzaWZpY2F0/aW9uLWNvcnBvcmF0/ZS5zdmc",
    "rating": 5
  },
  {
    "id": "5",
    "name": "Sneha Reddy",
    "position": "Project Manager",
    "company": "Cybershield",
    "testimonial": "Anshumesh is a brilliant instructor and a security expert. His ability to explain complex concepts in a simple way is rare. He has been instrumental in training our core team.",
    "image": "https://imgs.search.brave.com/C9CmRhDLpUbkeUGOhSZzar4g4g_b7BkwTQb4gP_geyA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jNS5y/Z3N0YXRpYy5uZXQv/bS80MTU0NDc1Njc2/NjEyNTYvaW1hZ2Vz/L3N5bWJvbHMvc3Zn/L2NsYXNzaWZpY2F0/aW9uLWNvcnBvcmF0/ZS5zdmc",
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