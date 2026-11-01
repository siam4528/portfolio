// All the site's text and links live here. Edit this file to update the site.

export const profile = {
  name: "Siam Hossain",
  email: "mdsiam4528@gmail.com",
  role: "I am",
  focus: ["Entrepreneur", "Cybersecurity", "Red teaming", "Ethical hacking"],
  tagline: "You can call me Siam",
  bio: "I study Computer Science and Engineering at Northern University of Bangladesh. I started from zero, and I believe a one placed in front of enough zeros makes a million, then a billion. I'm working to be that one.",
};

export type Skill = { name: string; source: string };

// "source" says where each skill was learned or used. It shows in the Skills section.
export const skills: Skill[] = [
  { name: "Cybersecurity", source: "Introduction to Cybersecurity, Cisco Networking Academy" },
  { name: "Computer Networking", source: "Introduction to Computer Networking, Simplilearn" },
  { name: "C", source: "Introduction to C Programming, Simplilearn" },
  { name: "C++ (OOP)", source: "Introduction to C++ Programming, Simplilearn" },
  { name: "Bash", source: "Learned while studying cybersecurity" },
  { name: "HTML", source: "Web page practice, including a first sketch of Help Hand" },
  { name: "CSS", source: "Web page practice, including a first sketch of Help Hand" },
];

export const links = [
  { name: "GitHub", url: "https://github.com/siam4528" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/-siam-hossain/" },
  { name: "TryHackMe", url: "https://tryhackme.com/p/agent36" },
];

export type Project = {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
};

// Add stack, github and demo when they're ready. Empty values stay hidden.
export const projects: Project[] = [
  {
    title: "LocalHaat",
    description: "A hyperlocal e-commerce platform for Bangladesh.",
    stack: [],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  skill: string;
  date?: string;
};

// Add a date to each one when you have it.
export const certifications: Certification[] = [
  { title: "Introduction to Computer Networking", issuer: "Simplilearn", skill: "Computer Networking" },
  { title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", skill: "Cybersecurity" },
  { title: "Introduction to C++ Programming", issuer: "Simplilearn", skill: "C++ (OOP)" },
  { title: "Introduction to C Programming", issuer: "Simplilearn", skill: "C" },
];
