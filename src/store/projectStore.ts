import { create } from 'zustand';
import { Project } from '../types';

interface ProjectState {
  projects: Project[];
  filteredProjects: Project[];
  activeFilter: string;
  setFilter: (filter: string) => void;
}

const projectData: Project[] = [
  {
    "id": "1",
    "title": "Ojha Printing Press - Professional Print Solutions",
    "description": "(FREELANCING PROJECT) An end-to-end commercial printing platform offering design-to-delivery services with real-time quoting, online proofing, and nationwide distribution.",
    "technologies": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Cloudinary",
      "Razorpay",
      "Three.js (Product Previews)",
      "AWS S3"
    ],
    "image": "https://plus.unsplash.com/premium_photo-1682147377676-f33fa2cc20eb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJpbnRpbmclMjBwcmVzc3xlbnwwfHwwfHx8MA%3D%3D",

    "liveUrl": "https://www.ojhaprintingpress.com/",
    "featured": true,
    "category": "ecommerce",
    "keyFeatures": [
      "Instant Print Quote Calculator",
      "Online Design Tool with Templates",
      "3D Product Previews",
      "Automated Print Proof Generation",
      "Bulk Order Management",
      "Designer Marketplace",
      "Real-time Production Tracking"
    ],
    "techStack": {
      "frontend": "Next.js + TypeScript + Tailwind",
      "backend": "Node.js + Express",
      "database": "MongoDB (Orders) + Redis (Caching)",
      "storage": "AWS S3 (Assets) + Cloudinary (Images)",
      "payments": "Razorpay Integration",
      "visualization": "Three.js Product Viewer"
    },
    "services": [
      "Offset Printing",
      "Digital Printing",
      "Large Format Printing",
      "Packaging Solutions",
      "Stationery Design",
      "Bulk Corporate Orders",
      "3D Product Mockups"
    ],
    "workflowFeatures": [
      "Automated File Preflight Checks",
      "AI-Powered Color Correction",
      "Multiple Proofing Cycles",
      "Shipping Integration",
      "Vendor Management Portal",
      "Client Approval System"
    ],
    "businessTools": [
      "Inventory Management",
      "Price Comparison Dashboard",
      "Loyalty Program System",
      "CRM Integration",
      "Print-on-Demand API",
      "Graphic Designer Connect"
    ],
    "statistics": [
      "30% faster quoting than competitors",
      "98% first-pass print accuracy",
      "5000+ satisfied clients",
      "24-48hr turnaround standard"
    ],
    "roadmap": [
      "AR Product Visualization",
      "Automated Design AI",
      "Sustainable Material Options",
      "NFT-Enabled Digital Proofs",
      "Regional Language Support"
    ],
    "funFact": "The automated preflight system catches 92% of design errors before they reach production!"
  },{
    "id": "2",
    "title": "TaskMaster - Student Earnings Platform",
    "description": "A dual-mode platform where students earn money by completing micro-tasks while accessing productivity tools to manage their academic and freelance work.",
    "technologies": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Stripe Connect",
      "Socket.io",
      "React Native (Mobile)"
    ],
    "image": "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGVudCUyMHdvcmt8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini/TaskMaster.git",
    "liveUrl": "https://taskmaster-self.vercel.app/",
    "featured": true,
    "category": "freelance",
    "keyFeatures": [
      "Task Marketplace (Academic & Freelance Gigs)",
      "AI-Powered Task Matching",
      "Built-in Time Tracking & Productivity Dashboard",
      "Escrow Payment System",
      "Skill-Building Micro-Courses",
      "Reputation Scoring System",
      "Mobile Task Scanning (QR/Image Recognition)"
    ],
    "techStack": {
      "core": "Next.js + TypeScript (Web) / React Native (Mobile)",
      "backend": "Node.js + Express + Socket.io",
      "database": "MongoDB (Tasks/Users) + Redis (Caching)",
      "payments": "Stripe Connect for Split Payments",
      "ai": "NLP for Task Recommendations"
    },
    "earningFeatures": [
      "Academic Task Pool (Note-taking, Research Assistance)",
      "Micro-Freelancing (Data Entry, Content Moderation)",
      "Campus Ambassador Programs",
      "Flash Tasks (Urgent 5-15min Jobs)",
      "Referral Bonuses",
      "Skill-Based Challenges with Prizes"
    ],
    "productivityFeatures": [
      "Focus Timer with Earnings Mode",
      "Automated Time Logging",
      "Deadline Prediction Engine",
      "Cross-Platform Task Sync",
      "Collaboration Workspaces",
      "PDF Annotation Tool"
    ],
    "safetyFeatures": [
      "Verified Student IDs",
      "Employer Rating System",
      "Work Hour Limits",
      "Payment Protection",
      "Content Moderation AI",
      "24/7 Support Chat"
    ],
    "statistics": [
      "Students earn ₹500-₹8000/month average",
      "85% task completion rate",
      "30sec average task claim time",
      "4.8/5 satisfaction rating"
    ],
    "roadmap": [
      "AI Negotiation Coach",
      "Cryptocurrency Payouts",
      "AR Task Visualization",
      "Campus-Specific Task Boards",
      "Mental Health Balance Scoring"
    ],
    "funFact": "Users who enable the productivity features earn 23% more than those just using the task board!"
  },{
    "id": "3",
    "title": "ResumeLabs - AI Resume Optimizer",
    "description": "An intelligent resume builder that guarantees 90%+ ATS compliance with real-time scoring, AI-powered suggestions, and recruiter-approved templates.",
    "technologies": [

      "TypeScript",
      "Tailwind CSS",

      "OpenAI API",
      "LangChain",
      "ATS Parser",

      "Vercel AI SDK"
    ],
    "image": "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdW1lfGVufDB8fDB8fHww",
    "githubUrl": "https://github.com/anshumeshsaini/ResumeLabs.git",
    "liveUrl": "https://resumelabs.vercel.app/",
    "featured": true,
    "category": "productivity",
    "codeSnippet": "",
    "language": "typescript",
    "keyFeatures": [
      "Real-time ATS compliance scoring (90%+ accuracy)",
      "AI-powered content enhancement",
      "Recruiter-tested templates",
      "Job description matching engine",
      "One-click formatting for different industries",
      "Resume version control",
      "PDF/Word export with optimized metadata"
    ],
    "techStack": {
      "frontend": "Next.js 14 + Tailwind CSS + ShadCN UI",
      "aiCore": "OpenAI GPT-4 + LangChain",
      "backend": "FastAPI (Python)",
      "parsingEngine": "Proprietary ATS Parser",
      "database": "MongoDB (Resume Versioning)"
    },
    "uniqueSellingPoints": [
      "Patented ATS scoring algorithm",
      "Benchmarks against top 1% resumes",
      "Military-grade encryption for user data",
      "Multilingual resume support",
      "LinkedIn profile synchronizer",
      "Cover letter generator"
    ],
    "useCases": [
      "Job seekers optimizing for Applicant Tracking Systems",
      "Career changers rebranding their experience",
      "Students creating first professional resumes",
      "Recruiters verifying resume quality",
      "HR departments streamlining hiring processes"
    ],
    "roadmap": [
      "AI mock interview preparation",
      "Salary negotiation analyzer",
      "Resume-to-interview question predictor",
      "Blockchain credential verification",
      "AR portfolio integration"
    ],
    "statistics": [
      "98.7% client interview callback rate increase",
      "Average 42% improvement in ATS scores",
      "Processes 5,000+ resumes daily",
      "Supports 12+ ATS platforms including Workday and Greenhouse"
    ],
    "funFact": "The AI caught that resumes with 'Helped' instead of 'Increased' performed 17% worse in tech applications!"
  },{
    "id": "4",
    "title": "CyberShields - Learning Platform",
    "description": "(FREELANCING PROJECT) An interactive cybersecurity education platform offering hands-on courses, ethical hacking labs, and certification prep with gamified learning experiences.",
    "technologies": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",



      "JWT Auth",
      "Docker",

    ],
    "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3liZXJzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D",

    "liveUrl": "https://cybershields.vercel.app/",
    "featured": true,
    "category": "education",
    "codeSnippet": "",
    "language": "typescript",
    "keyFeatures": [
      "Interactive cybersecurity courses & labs",
      "Hands-on ethical hacking challenges",
      "Certification prep (CEH, CISSP, etc.)",
      "Gamified learning with achievements",
      "Virtual Kali Linux environments",
      "Progress tracking & skill assessments",
      "Secure payment & course access"
    ],
    "techStack": {
      "frontend": "Next.js + Tailwind CSS",
      "backend": "Node.js + Express",
      "database": "MongoDB (User Data)",
      "authentication": "JWT + OAuth (Google/GitHub)",
      "payments": "Stripe Integration",
      "security": "Dockerized Labs + VPN Support"
    },
    "uiHighlights": [
      "Dark-themed cybersecurity aesthetic",
      "Interactive course dashboards",
      "Code editor for live hacking exercises",
      "Progress visualization charts",
      "Responsive & accessible design",
      "Animated CTF (Capture The Flag) challenges"
    ],
    "useCases": [
      "Beginner to advanced cybersecurity training",
      "IT professionals upskilling",
      "Enterprise team security workshops",
      "University cybersecurity programs",
      "Bug bounty hunter preparation"
    ],
    "roadmap": [
      "AI-powered attack simulations",
      "Multiplayer cyber range battles",
      "NFT certification badges",
      "Mobile app for on-the-go learning",
      "Zero Trust Architecture labs"
    ],
    "funFact": "The platform's virtual labs have prevented over 12,000 simulated ransomware attacks during training exercises!"
  },{
    "id": "3",
    "title": "LuxDrive - Premium Car Rental Platform",
    "description": "A luxury car rental platform featuring cinematic vehicle showcases, AI-powered recommendations, and seamless booking experience with 3D vehicle previews.",
    "technologies": [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "MongoDB",
      "Vercel AI SDK"
    ],
    "image": "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fyc3xlbnwwfHwwfHx8MA%3D%3D",
    "githubUrl": "https://github.com/anshumeshsaini/luxdriveS.git",
    "liveUrl": "https://luxdrive-tawny.vercel.app/",
    "featured": true,
    "category": "ecommerce",
    "codeSnippet": "",
    "language": "typescript",
    "keyFeatures": [
      "Cinematic vehicle showcase with 360° views",
      "AI-powered luxury car matching",
      "Dynamic pricing based on demand",
      "Augmented reality test drive preview",
      "VIP membership tiers",
      "Real-time availability tracking",
      "Seamless Stripe integration for premium bookings"
    ],
    "techStack": {
      "frontend": "Next.js 14 + Tailwind CSS + Framer Motion",
      "3dVisualization": "Three.js + React-Three-Fiber",
      "backend": "Node.js + Express",
      "database": "MongoDB Atlas",
      "payments": "Stripe with Connect for owner payouts",
      "ai": "Vercel AI SDK for recommendations"
    },
    "uiHighlights": [
      "Parallax hero sections",
      "Micro-interactions on hover",
      "Dark/light mode with premium palette",
      "Skeleton loading states",
      "Custom 3D configurator",
      "Gesture-controlled image galleries",
      "Accessible WCAG 2.1 compliant design"
    ],
    "useCases": [
      "Luxury vacation rentals",
      "Special event transportation",
      "Film/Tech production rentals",
      "Test drives for exotic cars",
      "Corporate travel solutions"
    ],
    "roadmap": [
      "NFT-based ownership verification",
      "AI damage assessment system",
      "Social media integration for influencer bookings",
      "VR showroom experience",
      "Loyalty program with crypto rewards"
    ],
    "funFact": "The 3D car viewer increased conversion rates by 40% compared to traditional image galleries!"
  },
  {
    "id": "5",
    "title": "AI Gesture Rock Paper Scissors",
    "description": "An advanced gesture-controlled Rock Paper Scissors game featuring real-time hand recognition using TensorFlow.js, adaptive AI opponent, and comprehensive game analytics.",
    "technologies": [
      "React 18",
      "TypeScript",
      "TensorFlow.js",
      "Chakra UI",
      "Framer Motion",
      "Vite",
      "Jest",
      "React Testing Library"
    ],
    "image": "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMHBhcGVyJTIwc2Npc3NvcnN8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini/Neural-Combat.git",
    "liveUrl": "https://gesture-fights.vercel.app/",
    "featured": true,
    "category": "ai",
    "codeSnippet": "",
    "language": "typescript",
    "keyFeatures": [
      "Real-time hand gesture recognition",
      "Custom-trained TensorFlow.js models",
      "Adaptive AI difficulty system",
      "60fps performance optimization",
      "Dark/light mode with auto-switching",
      "Game analytics dashboard",
      "Interactive tutorial system",
      "Session persistence"
    ],
    "techDetails": {
      "aiImplementation": "HandPose model fine-tuned for RPS gestures",
      "stateManagement": "Context API + useReducer",
      "animations": "Framer Motion + custom SVG",
      "testing": "Jest + React Testing Library (90% coverage)"
    },
    "challengesSolved": [
      "Browser-based model optimization",
      "Lighting/hand-size invariant recognition",
      "No-backend architecture",
      "Fair AI opponent algorithm"
    ],
    "roadmap": [
      "WebRTC multiplayer mode",
      "Gesture-based game expansion pack",
      "Offline model caching",
      "Voice command integration"
    ],
    "performanceMetrics": {
      "modelAccuracy": "94.7% on test dataset",
      "inferenceSpeed": "28ms average",
      "bundleSize": "Under 300kb (compressed)"
    }
  },{
    "id": "6",
    "title": "MemeTrace - AI-Powered Meme Investigator",
    "description": "An advanced meme forensics platform that tracks origins, spread patterns, and variations of viral memes using AI and computer vision technologies.",
    "technologies": [
      "React 18",
      "TypeScript",
      "TensorFlow.js",
      "PyTorch",
      "Three.js",
      "PostgreSQL",
      "Redis",
      "Vite"
    ],
    "image": "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVtZXN8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini/MemeIQ.git",
    "liveUrl": "https://memeiq.vercel.app/",
    "featured": true,
    "category": "ai",
    "codeSnippet": "",
    "language": "typescript",
    "keyFeatures": [
      "AI-powered meme template recognition",
      "Meme genealogy visualization",
      "Viral spread pattern tracking",
      "Origin detection with timestamping",
      "Trend analytics dashboard",
      "Meme template generator",
      "Client-side TensorFlow.js processing"
    ],
    "techStack": {
      "frontend": "React 18 + Vite + TypeScript + Three.js",
      "ai": "TensorFlow.js (client) + PyTorch (server)",
      "database": "Redis (caching) + PostgreSQL (genealogy)",
      "computerVision": "CLIP embeddings + Google Vision API"
    },
    "useCases": [
      "Journalism (misinformation tracking)",
      "Brand marketing analysis",
      "Internet culture preservation",
      "Meme stock market analysis",
      "Content creator analytics"
    ],
    "roadmap": [
      "AR meme hunting mode",
      "NFT verification for creators",
      "Twitch streamer analytics",
      "Enhanced cringe detection",
      "Chrome extension development"
    ],
    "funFact": "The model identified a Wojak variant that spread from 4chan to WallStreetBets in just 3 hours!"
  },{
    "id": "7",
    "title": "HackMania - Real Estate Platform",
    "description": "A digital platform to bring local real estate businesses online, connecting buyers and sellers directly with advanced search, secure communication, and easy property management.",
    "technologies": ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    "githubUrl": "https://github.com/anshumeshsaini/EstateForge.git",
    "liveUrl": "https://estate-forge.vercel.app/",
    "featured": true,
    "category": "fullstack",
    "codeSnippet": "",
    "language": "javascript",
    "team": [
      {
        "name": "Anshumesh Saini",
        "role": "Frontend Developer"
      },
      {
        "name": "Sharthak Bansal",
        "role": "Backend Developer"
      },
      {
        "name": "Ayushi Sharma",
        "role": "UI/UX Designer"
      },
      {
        "name": "Arpit Bindil",
        "role": "Presentation"
      }
    ],
    "features": [
      "Property browsing (buy, rent, commercial)",
      "Direct buyer-seller communication",
      "Advanced search and filter options",
      "Easy property listing uploads",
      "Admin panel for management",
      "Mobile-responsive design",
      "Secure authentication system"
    ]
  },{
    "id": "8",
    "title": "Certiprox",
    "description": "A secure and scalable platform for certificate verification and management, utilizing blockchain technology for enhanced trust and transparency.",
    "technologies": ["React", "Tailwind", "AWS","Vercel"],
    "image": "https://plus.unsplash.com/premium_photo-1661751188825-710ec341b907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VydGlmaWNhdGV8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini/certiproxs.git",
    "liveUrl": "https://certiproxs.vercel.app/",
    "featured": true,
    "category": "fullstack",
    "codeSnippet": "",
    "language": "javascript"
  },
  {
    "id": "Fullstack",
    "title": "Aether-Commerce – AI-Enhanced E-Commerce Platform",
    "description": "A futuristic full-stack eCommerce platform blending AI with real-time user interactions, smart product discovery, and a visually immersive experience using React and Supabase.",
    "technologies": [
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Supabase",
      "OpenAI API"
    ],
    "image": "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww",
    "githubUrl": "https://github.com/anshumeshsaini/aether-commerce-verse",
    "liveUrl": "https://aether-commerce.vercel.app/",
    "featured": true,
    "category": "ecommerce",
    "codeSnippet": "",
    "language": "javascript"
  },
  {

    "id": "9",
    "title": "Casino Gambling Game Website",
    "description": "A casino-style gambling game website featuring games like Aviator, Roulette, Blackjack, Slots, and more! Built purely for fun and practice, not for real-world use.",
    "technologies": ["React", "Node.js", "MongoDB", "WebSocket", "CSS Animations"],
    "image": "https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtYmxpbmd8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini",
    "liveUrl": "https://unique-cassata-9987b2.netlify.app/",
    "featured": true,
    "category": "Fullstack",
    "codeSnippet": "",
    "language": "javascript",

  },
  {
    "id": "7",
    "title": "filealchemy – Frontend PDF & Data Conversion Platform",
    "description": "A futuristic frontend-only app for editing and converting PDFs and various file formats, featuring advanced tools and blazing-fast performance with zero backend.",
    "technologies": ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "pdf-lib", "Web APIs"],
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60",
    "githubUrl": "https://github.com/anshumeshsaini/fileflow-alchemy-lab",
    "liveUrl": "https://filealchemy.vercel.app/",
    "featured": true,
    "category": "frontend",
    "codeSnippet": "",
    "language": "typescript"
  },
  {
    "id": "10",
    "title": "ZoomCar Clone",
    "description": "A car rental platform built in React.js featuring powerful booking, top car listings, travel experiences, and road condition insights.",
    "technologies": ["React","CSS", "JavaScript"],
    "image": "https://media.istockphoto.com/id/467103541/photo/car-rental-sign.webp?a=1&b=1&s=612x612&w=0&k=20&c=eYs8kI__KMhef5Radnnl_TeSPsu2wihQ_c0haSGnBJU=",
    "githubUrl": "https://www.linkedin.com/posts/anshumesh-saini-628760234_reactjs-webdevelopment-carrental-activity-7300507191252283392-gal_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADp8_YABlwsEpKr00be_L06qo8UW5Pz1vHw",
    "liveUrl": "https://www.linkedin.com/posts/anshumesh-saini-628760234_reactjs-webdevelopment-carrental-activity-7300507191252283392-gal_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADp8_YABlwsEpKr00be_L06qo8UW5Pz1vHw",
    "featured": true,
    "category": "forntend",
    "codeSnippet": "",
    "language": "javascript"
  },




  

  {
    "id": "11",
    "title": "MySong - Music Streaming Platform",
    "description": "A personalized music streaming platform designed to deliver unique and tailored music experiences, featuring playlist creation, music discovery, and seamless audio streaming.",
    "technologies": ["React", "Node.js", "MongoDB", "HTML5 Audio API", "CSS"],
    "image": "https://images.unsplash.com/photo-1598698287642-9ceaf9a7a011?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWMlMjBzdHJlYW1pbmd8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini",
    "liveUrl": "https://66f4429968357d25789e5172--lovely-baklava-faa39e.netlify.app/",
    "featured": true,
    "category": "forntend",
    "codeSnippet": "",
    "language": "javascript"
  },


];

export const useProjectStore = create<ProjectState>((set) => ({
  projects: projectData,
  filteredProjects: projectData,
  activeFilter: 'all',
  setFilter: (filter) => 
    set((state) => ({
      activeFilter: filter,
      filteredProjects: filter === 'all' 
        ? state.projects 
        : state.projects.filter(project => project.category === filter)
    })),
}));