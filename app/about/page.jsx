"use client";

import { FaReact, FaNodeJs } from "@/node_modules/react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiPostgresql,
  SiFirebase,
  SiDocker,
  SiGraphql,
  SiMongodb,
} from "react-icons/si";
import { motion } from "framer-motion";

// components
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// about data
const about = {
  title: "About me",
  description:
    "Driven by curiosity and perseverance, I am passionate about developing intuitive software that brings value to the world. I believe in the power of technology to bridge gaps, spark positive change, and empower users to achieve their goals.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Bhavya Mandviya",
    },
    {
      fieldName: "Experience",
      fieldValue: "3+ Years",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+91) 9284244459",
    },
    {
      fieldName: "Email",
      fieldValue: "mandviyabhavya@gmail.com",
    },
    {
      fieldName: "Location",
      fieldValue: "Vadodara, Gujarat, India",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Hindi, Gujarati",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "Adept in the JavaScript ecosystem, I work with modern frameworks and tools to build fast and visually engaging web applications that deliver seamless user experiences.",
  skillList: [
    {
      icon: <FaReact />,
      name: "React.js",
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "TailwindCSS",
    },
    {
      icon: <SiFirebase />,
      name: "Firebase",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.js",
    },
    {
      icon: <SiExpress />,
      name: "Express.js",
    },
    {
      icon: <SiGraphql />,
      name: "GraphQL",
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
    },
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <SiDocker />,
      name: "Docker",
    },
  ],
};

// experience data
const experience = {
  icon: "/assets/about/badge.svg",
  title: "My experience",
  description:
    "Skilled in both frontend and backend technologies, collaborating effectively with cross-functional teams and stakeholders.",
  items: [
    {
      position: "Full-Stack Developer",
      company: "Company Name", // Added company field
      duration: "2023-2024",
      highlights: [
        // Changed to array of highlights
        "Developed 7+ mobile and 6+ web applications with 10K+ active users",
        "Built 15+ RESTful APIs with secure payment gateways (35% faster transactions)",
        "Optimized backend logic improving system response time by 40%",
        "Led frontend development using React.js and React Native",
        "Integrated CDN reducing page load time by 50%",
      ],
    },
    {
      position: "MERN Stack Developer",
      company: "Company Name", // Added company field
      duration: "2024-Present",
      highlights: [
        "Built 8+ full-stack MERN applications improving performance by 25%",
        "Designed RESTful APIs handling 150+ daily requests (30% faster response)",
        "Optimized MongoDB queries achieving 40% backend efficiency boost",
        "Implemented real-time features increasing user retention by 15%",
        "Refactored database schema reducing query time by 30%",
      ],
    },
  ],
};

// education data
const education = {
  icon: "/assets/about/cap.svg",
  title: "My education",
  description:
    "Solid academic foundation in computer science, enhanced by specialized certifications.",
  items: [
    {
      institution: "Babaria Institute of Technology",
      degree: "Bachelor of Engineering in Computer Science",
      duration: "2019 - 2023",
    },
    {
      institution: "React.js Frontend Certification",
      degree: "Udemy",
      duration: "2023",
    },
    {
      institution: "Node.js Backend Development Certification",
      degree: "Udemy",
      duration: "2023",
    },
    {
      institution: "React-Native Development Certification",
      degree: "Udemy",
      duration: "2023",
    },
  ],
};

const About = () => {
  return (
    <motion.div
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="about"
          className="flex flex-col xl:flex-row gap-[60px] xl:px-[30px] xl:h-[582px]"
        >
          <TabsList className="flex flex-col w-full max-w-[360px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="w-full min-h-[25vh]">
            {/* about */}
            <TabsContent value="about" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <div className="flex flex-col gap-2">
                  <h3 className="h3">{about.title}</h3>
                  <p className="p">{about.description}</p>
                </div>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                    {about.info.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-secondary h-[100px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start"
                        >
                          <span className="text-[#70757f] uppercase">
                            {item.fieldName}
                          </span>
                          <h3 className="text-base uppercase text-white/80">
                            {item.fieldValue}
                          </h3>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <div className="flex flex-col gap-2">
                  <h3 className="h3">{skills.title}</h3>
                  <p className="p">{skills.description}</p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-secondary rounded-xl flex flex-col justify-center items-center group">
                              <div className="text-5xl group-hover:text-[#70757f] transition-all duration-300">
                                {skill.icon}
                              </div>
                              {/* Display the skill name directly on smaller screens */}
                              <p className="text-sm mt-2 xl:hidden group-hover:text-[#70757f] transition-all duration-300">
                                {skill.name}
                              </p>
                            </TooltipTrigger>
                            {/* Tooltip content only visible on xl screens and larger */}
                            <TooltipContent className="hidden xl:block">
                              <p>{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <div className="flex flex-col gap-2">
                  <h3 className="h3">{experience.title}</h3>
                  <p className="p">{experience.description}</p>
                </div>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-secondary p-6 rounded-xl flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-bold">
                                {item.position}
                              </h3>
                              {item.company && (
                                <p className="text-sm text-white/80">
                                  {item.company}
                                </p>
                              )}
                            </div>
                            <span className="text-[#70757f] text-sm">
                              {item.duration}
                            </span>
                          </div>
                          <ul className="mt-2 space-y-1">
                            {item.highlights.map((highlight, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="w-[6px] h-[6px] rounded-full bg-white mt-2"></span>
                                <p className="text-white/60 text-sm">
                                  {highlight}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <div className="flex flex-col gap-2">
                  <h3 className="h3">{education.title}</h3>
                  <p className="p">{education.description}</p>
                </div>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-secondary h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start"
                        >
                          <span className="text-[#70757f]">
                            {item.duration}
                          </span>
                          <h3 className="max-w-[260px] min-h-[60px] flex items-center justify-center">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-gray-500"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default About;
