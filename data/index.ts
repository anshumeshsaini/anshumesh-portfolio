import { links } from "@/config";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "I prioritize client collaboration, fostering open communication ",
    description: "",
    className: "lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/b1.svg",
    spareImg: "",
  },
  {
    id: 2,
    title: "I'm very flexible with time zone communications",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "",
    spareImg: "",
  },
  {
    id: 3,
    title: "My tech stack",
    description: "I constantly try to improve",
    className: "lg:col-span-2 md:col-span-3 md:row-span-2",
    imgClassName: "",
    titleClassName: "justify-center",
    img: "",
    spareImg: "",
  },
  {
    id: 4,
    title: "Tech enthusiast with a passion for development.",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "/b4.svg",
  },

  {
    id: 5,
    title: "Currently building a JS Animation library",
    description: "The Inside Scoop",
    className: "md:col-span-3 md:row-span-2",
    imgClassName: "absolute right-0 bottom-0 md:w-96 w-60",
    titleClassName: "justify-center md:justify-start lg:justify-center",
    img: "/b5.svg",
    spareImg: "/grid.svg",
  },
  {
    id: 6,
    title: "Do you want to start a project together?",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-center md:max-w-full max-w-60 text-center",
    img: "",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "FigPro - Collaborative Design Tool",
    des: "A collaborative design tool with real-time collaboration, vector editing, and a responsive UI.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "https://clone-figmaa.netlify.app",
    sourceCode: "https://github.com/sanidhyy/figma-clone",
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/p2.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "https://clone-yoom.netlify.app",
    sourceCode: "https://github.com/sanidhyy/zoom-clone",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "https://ai-imaginify.netlify.app",
    sourceCode: "https://github.com/sanidhyy/imaginify",
  },
  {
    id: 4,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: "/p4.svg",
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/three.svg", "/gsap.svg"],
    link: "https://app-iphone.netlify.app",
    sourceCode: "https://github.com/sanidhyy/apple-clone",
  },
] as const;

export const testimonials = [
  {
    quote: `During our hackathon, Anshumesh played a key role in ensuring we delivered a high-quality, functional prototype. His ability to work under pressure and write clean, scalable code was truly impressive.`,
    name: "Sarthak Bansal",
    title: "Hackathon Team Member • Hackathon Project",
  },
  {
    quote: `Anshumesh's frontend expertise and eye for design made a huge impact on our projects. His ability to create visually stunning and highly interactive interfaces is outstanding.`,
    name: "Aditya Goyal",
    title: "Web Development Team Lead • Cyberonites",
  },
  {
    quote: `Working with Anshumesh on various freelance projects has been an amazing experience. His problem-solving skills and ability to implement efficient solutions make him a valuable collaborator.`,
    name: "Parthemesh Saini",
    title: "Software Engineer • Self-Employed",
  },
  {
    quote: `Anshumesh is a great freelancer who delivers high-quality work and always ensures the final product exceeds expectations.`,
    name: "Aditya Singh",
    title: "Client • Freelance Project",
  },
  {
    quote: `Working with Anshumesh was a smooth and professional experience. His dedication to building modern and efficient web solutions truly stands out.`,
    name: "Sonal Singh",
    title: "Client • Web Project",
  },
  {
    quote: `Anshumesh consistently delivers reliable and well-structured web applications. His ability to transform ideas into real products is impressive.`,
    name: "Salad Verse",
    title: "Startup Founder",
  }
] as const;

export const companies = [
  {
    id: 1,
    name: "GLA UNIVERSITY",
    img: "/cloud.webp",
    nameImg: "/cloudName.svg",
  },
  {
    id: 2,
    name: "Drunken Monkey",
    img: "/app.webp",
    nameImg: "/appName.svg",
  },
  {
    id: 3,
    name: "NHRWWO",
    img: "/host.png",
    nameImg: "/hostName.svg",
  },
  {
    id: 4,
    name: "SEVA SAMARPIT FOUNDATION",
    img: "/s.jpg",
    nameImg: "/streamName.svg",
  },
  {
    id: 5,
    name: "MEDIA ON STAKE",
    img: "/dock.png",
    names: "/dockerName.svg",
  },
] as const;

export const workExperience = [
  {
    id: 1,
    title: "Web Developer",
    company: "Cyberonites Club",
    desc: "Developing and maintaining web applications with a focus on performance and security. Implementing modern UI/UX designs and enhancing website interactivity.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    className: "md:col-span-2",
    thumbnail: "/exp1.svg",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Vize",
    desc: "Building responsive and high-performance user interfaces. Enhancing user experience through interactive web elements and optimized designs.",
    technologies: ["React", "JavaScript", "Tailwind CSS", "Next.js", "TypeScript"],
    className: "md:col-span-2",
    thumbnail: "/exp2.svg",
  },
  
  {
    id: 3,
    title: "Technical Lead",
    company: "MediaOnStake",
    desc: "Leading the technical development of web platforms, managing development teams, and implementing scalable full-stack solutions using modern technologies.",
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Tailwind CSS", "TypeScript"],
    className: "md:col-span-2",
    thumbnail: "/exp4.svg",
  },
  {
    id: 4,
    title: "Lead Technical Instructor",
    company: "CyberShield",
    desc: "Teaching and mentoring students in web development, cybersecurity fundamentals, and modern software development practices through practical projects.",
    technologies: ["JavaScript", "React", "Node.js", "Cybersecurity", "Web Development"],
    className: "md:col-span-2",
    thumbnail: "/exp3.svg",
  }
] as const;

export const socialMedia = [
  {
    name: "GitHub",
    img: "/git.svg",
    link: "https://github.com/anshumeshsaini",
  },
  {
    name: "Twitter",
    img: "/twit.svg",
    link: "https://x.com/",
  },
  {
    name: "LinkedIn",
    img: "/link.svg",
    link: "https://www.linkedin.com/in/anshumesh-saini-3b2a94385",
  },
] as const;

export const techStack = {
  stack1: ["React.js", "Next.js", "Typescript"],
  stack2: ["Vue.js", "AWS", "MongoDB"],
} as const;
