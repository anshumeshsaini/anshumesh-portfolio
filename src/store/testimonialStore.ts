import { create } from 'zustand';
import { Testimonial } from '../types';

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
    "image": "https://media.licdn.com/dms/image/v2/D5603AQFkvAtzb79_dA/profile-displayphoto-shrink_200_200/B56ZT7L8OCHQAY-/0/1739381002500?e=1749081600&v=beta&t=22oTYkLz0BxcPtQPkYeCwEgM37hxW8VE2VQBR2aefnk",
    "rating": 5
  },
  {
    "id": "2",
    "name": "Parthemesh Saini",
    "position": "Software Eng.",
    "company": "Self-Employed",
    "testimonial": "Working with Anshumesh on various freelance projects has been an amazing experience. His problem-solving skills and ability to implement efficient solutions make him a valuable collaborator.",
    "image": "https://media.licdn.com/dms/image/v2/C4E03AQFpyvmvPYO72g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1630345689161?e=2147483647&v=beta&t=pNWF1ZfH_tTfSo1E4CKSNm-6LUHo-CtZ5Rmwa9r4nM8",
    "rating": 5
  },
  {
    "id": "3",
    "name": "Sarthak Bansal",
    "position": "Hackathon Team Member",
    "company": "Hackathon Project",
    "testimonial": "During our hackathon, Anshumesh played a key role in ensuring we delivered a high-quality, functional prototype. His ability to work under pressure and write clean, scalable code was truly impressive.",
    "image": "",
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