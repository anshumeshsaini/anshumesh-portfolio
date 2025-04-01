import { create } from 'zustand';
import { Experience } from '../types';

interface ExperienceState {
  experiences: Experience[];
}

const experienceData: Experience[] = [
  {
    "id": "1",
    "company": "Cyberonites Club",
    "position": "Web Developer",
    "duration": "December 2024 - Present",
    "description": "Developing and maintaining web applications with a focus on performance and security. Implementing modern UI/UX designs and enhancing website interactivity.",
    "technologies": ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    "logo": "https://media.licdn.com/dms/image/v2/C5603AQHf63mFXHbhow/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1662801204288?e=2147483647&v=beta&t=7NOTCkmoTbbu8mw5ugV1HkxPc3-yEpVDIKMlDr7Lf8U"
  },
  {
    "id": "2",
    "company": "Vize",
    "position": "Frontend Developer",
    "duration": "March 2025 - Present",
    "description": "Building responsive and high-performance user interfaces. Enhancing user experience through interactive web elements and optimized designs.",
    "technologies": ["React", "JavaScript", "Tailwind CSS", "Next.js", "TypeScript"],
    "logo": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhASBwgTFhUWGB8bGRgVFRkfIRoYHxgWIiAdGxobKCkhHh4xHxsYIT0lJSotLi4vGCMzODMsNygxOjcBCgoKDg0OGxAQGzAfICYtLTItLS0vKystLS0tLy0tLSstLS0rLS0tLS0tLS0tLi0tKy0tLS0tKy8tLS0tLy8tLf/AABEIAMgAyAMBEQACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAABQYHBAMC/8QAQRAAAQIEAgYGBggEBwAAAAAAAAECAwQFEQYSByExQVGRFyJhcYHRE1JUobHBFBU2VWJygvAyQrPCIyQlNHODsv/EABoBAQACAwEAAAAAAAAAAAAAAAAEBQEDBgL/xAAuEQEAAQQBAwQBAwIHAAAAAAAAAQIDBBEhBRIxExRBURUiYYEjsSQyM0JxkeH/2gAMAwEAAhEDEQA/AIM75zoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABrfBrlK4aocav1NIUF2VLXc71W+ZEzMuMejc8/TdZtzcq00KJo2pCy9mR4qO9bMi6+61ihjq97u3Kw9lRLN65So9FqT4MztbsVNitXYqfvcdDi5EX6O+FbdomivtcBIawAAAAAAAAAAAAAAAAAAAAAAAEkLVo7rMvSaw5J1yNZEblzLude6X7NpVdVx6rlG6edJeJdiirlrqx4LYOd0VuW1810tbjc5jsnetcrXvp8sax7VZer4gc6UddrGoxHetZXKqp4u9x1fTMebVr9XmVRk3Iqq4V0sUYAAAAAAAAAAAAAAAADINS7kPNU6jbMeWppoypdv97G5s8jmfzF6J8Qs/ZUnRlS/bY3NnkY/MXtM+ypVvGGE5ShRJZJePEd6Vyoua2pEy7LJ2lhg51d6Ku6PCNfsRRqIWToypftsbmzyK+esXfqEiMKnydGVL9tjc2eQ/MXfqGfZ0+UbQ8ByFRgxXRZqKmSK9iWVuxrlRF2bTde6pdpmOPMNdvFpq5SfRrTctvp0e3C7fI0flbnnUNvs415UDFFMhUauRYEB7lazLZXWvra1d3eXuFfqvWYrmFfet9lzS7yWjimzEnDe6cjXc1F2t3oi8CnudWu01zEQm04cTTuXv0ZUv22NzZ5Gv8xe+nr2VB0ZUv22NzZ5D8xe14PZUHRlS/bI3NnkZ/MXvo9nSz3EVPh0qtRoMF6qjFREV23Yi/MvsS9VesxXUr7tPZXMJ/DWA5uqQmxJ+J6KGutEtdzk42XYnfyIOX1ai1M024232cTvjcrfB0e0GGyz4cR3ar1+VkKmerZH2mRiW9OKpaNafFYv1dMvY7g7rN8/eb7PV7kT+uNw8V4VPwzus0icos4sOeh2XcqbHJxapfY+TRfp7qP5V9y3Nupwkjlr+dgYAAAAAMgi2W55qjcaZhsmDsWtxE6IyLARj22VER17t4+C/FDks7BnG1PlcY9+K1o7yu8pLKNItYmYlZZCmJVG+hdmaqKvXauVUXs2HS9KsUxbmqJ8qzKuzFWpjw0HDVSmKtSWRpqWSHnvZEW/V3L46/cUWTaptXJoidp1ququmJ04sY4nbhyBDywUe966mqtuqm1edjdhYU5FXnWni/fi3CC0f4ldOT0SAsqiZ3RIubNszOvltbt23JfUcH0qYr39Q0496Kp00Apk5i2kT7XzH6P6bDrOmR/hY/lT5X+s16kr/AKXA/wCNv/lDmLsfrn/mVpbn9KsJi+ej4iiSshSUerXKmZYioiIi/wAS9XUhN9lRFmLldWmj3FU19kQuKXtrK7jaXDwnpyBISrok3ERrWpdVX9+49UUVXKu2l5qrimOWX0OBBxZjmJFdCX0SL6RWu3omVGovetlt2KdFkVVYuHFG+ZVtuPWuTPw1dEtsOb2s41rUKRivHa0ipLBkpZr1bbM5yra6peyInhzLbD6b61HfVOkS9kzTVqITmE8QMxDTliJByua7K5t767It0Xhr+JDy8b0K+3e4brN31Kdy5dIFMh1DDkRyt60JM7V4W2pyv7jZ06/Nu9ER4l5yaIqp2xk7DmFLoAAAAAAAAkMP1SJR6vDjQ9jV6ycWrqVOXwI2ZY9e3NLbZudle28QIsOYgtfCddrkRUVN6LrRTi6ommZiV5TVuNwpmkGg/Wk7JuhJrdESE5U9Vbrfws7mWfT8v0aa4/ZEybXdVErnBhQ5eA1sJqI1qWROCJsKyZmqdpURpiOMav8AXNdiPa7qJ1WflTf4rdfE67p9j0bURrlTZFzvr2lNF/2n/wCt39po6xH9Ftw/87XlOX0tmLaRPtfMfo/psOt6VzjU/wA/3U2VP9SXFRYVXq862DITERV/O6zW8V4IbMmqzZp7qo/9ebcV1zqGwYfocvRJTLCu57tb4i7Xu4r2dhy2RkVXq9z4+ltatxRHDunpuBIyrok1ERrWpdVU1UUVV1dtL3VVqNyyfFlUq+I5hPRSMZICa2NRjtf4l1a1+B0eDZsY8fqmO5V3q67k6iOEvophPgT022Yhq12VmpyKi2u7cvgR+sVxXTRNPhtwommZiWklCsdIqZi0FI7vpL5bNfrZlh3v231m+mL2v071/LVVNEeX1AqFElkVJebl239V7E+CmKrd2rzEz/2RVRT4cOJaxTlw/NIyehOVYTkREe1VVVaqJqv2m3GsXJu08T5eLtymaJmGKHZ86Uu53sAAAAAAAADxyz+7U9F9a+lU50tGd1oWtvaxV+S/FDmOrY3Zc9SPErTDu7p7ZXZ7GvVFc3Yt07FsqfNSoidJkq3pBq/1VQXJDdZ8XqN7v5l5fFCf02x616N+IR8m52USxo6+FPvho+jChojUnPpHrMyZe1Nd79nA53q2T+qbWljiWuO5opRp7M9JeH0gxHzn0hVzua3Jl2dS181/w8N5fdKy5iPR198q/Ls/7lwwjR5Sk0iGkqzrPajnuXa5VS/JL6k3FZm5Fd67PclWLcURwnCI3qzijDExiKI30lUVkNuxiQ76+Krm1qTcXLixE6p3P2j3rNVydxPCekZZJSShw818jUbfjZES5Err7pmpupjtjShzdXZSNJkRY7rMe1rHLwu1ll5onNS4ox5vYMTHmN/3QqrkUX2hp2FL8p3nlS8V4EbWJ5Y0lMox7v4kcmpVta901oWmH1L0aeyY3CLexu/xKMkNGLvSotQqCZd6Q261/UuzkSLnWf06pp5aqcOfmXLjnBjKdBSPSIa+jRLPbdVy/i17uP7tt6d1Ga6uy48ZOPNMbpUUvUGd6AwAAAAAAABlIUCqxKNVocaFryr1k4tXan74EfKx/XtTS92bs0VbaB0nSHsEXm0ovwtyflYRnU/Sl4vxAuIaij2sVrGts1q81XxXV4IW+Bh+3tzvyhX73egyc0fC7YSxrK0KkJBjSr3LmVbtVLaylzem13rvfEp1jJ7KdJrpOkPYIvNpE/DXPtu99T9IPF+M5WvUpIUCVe1c6Ou5U3IvDvJWH02u1c7plovZVNXwlpLSRIy8pDY6RiLlaibW7kRCPc6PcmqZ2205lMfD26TpD7vi82nj8Nc+3r31P0dJ0h93xebR+GufZ72n6Ok6Q+74vNo/DXPs97T9KJimqw61WXxoMNWo5E1Lt1NRPkXeHjzZsxRVyg3rnqTuE5hnHs1SoTYc/DWLDTUi36zU4fiTv5kLL6VTdmarfEt9nLmmNSuEHSDQIjLvjPb2Ohu+VyrnpWRHiEv3dDwm9I1Ggt/y7YkRd1m2Tm7yPVHSL8zzwxOZQpWJMZ1GuNVjf8OEv8jV1r+Z2/u2FxidNt2J3PMoV7JmvhWiyj90WJAAAAAAAABmOOTxAYZ+Acscg/ZkM/Oj5DHDHyBkG/g4ABnywBkADf0wGNTBx8Bng3IY5Z5DPEMBgAAAAAAAAAAAZAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH//Z"
  }

];

export const useExperienceStore = create<ExperienceState>(() => ({
  experiences: experienceData,
}));