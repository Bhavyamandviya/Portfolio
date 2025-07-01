"use client";

import React from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    num: "03",
    category: "fullstack",
    title: "Deal Finder",
    description: "Restaurant search platform with admin and merchant panels.",
    detailedDescription:
      "Restaurant discovery platform with admin panel for merchant management and merchant panel for deal management. Features location-based search and analytics tracking.",
    role: "Full development from scratch including backend, admin panel, and merchant panel with all necessary APIs.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
    ],
    image: "/assets/projects/Deal-Finder.png",
    live: "https://dealfinderapp.com/",
  },
  {
    num: "01",
    category: "fullstack",
    title: "The Big Picture",
    description:
      "Student-coach relationship platform for task management and communication.",
    detailedDescription:
      "Developed a platform to help students manage school tasks while enabling coaches to assign tasks, provide resources, and share files. Features include calendar scheduling, chat system, and superadmin panel.",
    role: "Full-stack development including task management, resource sharing, chat functionality, and superadmin controls.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
    ],
    image: "/assets/projects/big-picture.png",
    live: "https://app.thebigpicture.net.au/big-picture-front/",
  },
  {
    num: "04",
    category: "fullstack",
    title: "Jivan Oil World",
    description: "Admin panel for e-commerce mobile app with order management.",
    detailedDescription:
      "Comprehensive admin panel to manage listings, orders, and invoices with Tally integration for an e-commerce mobile app.",
    role: "Developed the admin panel with order handling and Tally integration for invoice generation.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Firebase" },
    ],
    image: "/assets/projects/jivan-oil.png",
    live: "https://admin.jivanoilworld.com/",
  },
  {
    num: "02",
    category: "fullstack",
    title: "WIRC of ICAI",
    description:
      "Platform for Chartered Accountants in Western India with job portal and event management.",
    detailedDescription:
      "Platform for Chartered Accountants featuring industry updates, job opportunities, articles, newsletters, and historical records. Includes helpdesk support, job portal, and event registration with payment gateway.",
    role: "Designed and developed the website, building all functionalities and APIs for event registrations, job listings, and payment integration.",
    stack: [
      { name: "React.js" },
      { name: "PostgreSQL" },
      { name: "GraphQL" },
      { name: "TypeORM" },
    ],
    image: "/assets/projects/wirc.png",
    live: "https://wirc-icai.org/",
  },
  {
    num: "06",
    category: "frontend",
    title: "Baroda ICAI",
    description: "Website for the Baroda chapter of ICAI.",
    detailedDescription:
      "Informational website for the Baroda chapter of the Institute of Chartered Accountants of India.",
    role: "Frontend development with focus on user experience and performance.",
    stack: [
      { name: "React.js" },
      { name: "PostgreSQL" },
      { name: "GraphQL" },
      { name: "TypeORM" },
    ],
    image: "/assets/projects/baroda-icai.png",
    live: "https://baroda-icai.org/",
  },
  {
    num: "05",
    category: "mobile",
    title: "WIRC Mobile App",
    description: "Mobile version of the WIRC of ICAI platform.",
    detailedDescription:
      "Mobile application providing access to WIRC of ICAI features including news, events, and member services.",
    role: "Developed the mobile application with similar functionality to the web platform.",
    stack: [{ name: "React-Native" }, { name: "TypeScript" }, { name: "Expo" }],
    image: "/assets/projects/wirc-mobile.png",
    live: "https://play.google.com/store/apps/details?id=com.amitaujas.WIRCUser&hl=en-IN",
  },
];

const Projects = () => {
  return (
    <motion.div
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-6"
    >
      <div className="container mx-auto">
        <h3 className="h3 mb-8 text-[#70757f] text-center">My Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative group rounded-xl overflow-hidden shadow-lg"
            >
              {/* Image */}
              <div className="relative w-full h-60">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  quality={90}
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-scale-down rounded-xl"
                  priority={project.num === "02"}
                />
              </div>

              {/* Project Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/95 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm mt-2 text-white/80">
                  {project.description}
                </p>

                {/* Stack */}
                <ul className="flex gap-2 text-xs mt-2">
                  {project.stack.map((item, index) => (
                    <li key={index} className="text-[#70757f]">
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  ))}
                </ul>

                {/* Buttons */}
                <div className="mt-4 flex gap-4">
                  <Link
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 bg-secondary text-[#70757f] rounded-full flex items-center justify-center cursor-pointer hover:bg-accent hover:text-primary transition-all duration-500">
                      <BsArrowUpRight className="text-xl" />
                    </div>
                  </Link>
                  {/* <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-10 h-10 bg-secondary text-[#70757f] rounded-full flex items-center justify-center cursor-pointer hover:bg-accent hover:text-primary transition-all duration-500">
                      <BsGithub className="text-xl" />
                    </div>
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
