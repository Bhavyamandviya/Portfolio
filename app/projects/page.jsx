"use client";

import React from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const projects = [
  {
    num: "01",
    category: "fullstack",
    title: "Deal Finder",
    description: "Australia-based restaurant discovery platform with merchant management.",
    detailedDescription:
      "Restaurant discovery platform with admin panel for merchant management and merchant panel for deal management. Features location-based search, subscription module, and analytics tracking.",
    role: "Full development from scratch including backend, admin panel, merchant panel, mobile APIs, and CI/CD pipeline implementation.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "Stripe" },
      { name: "React Native" },
    ],
    image: "/assets/projects/Deal-Finder.png",
    live: "https://dealfinderapp.com/",
    slug: "deal-finder"
  },
  {
    num: "02",
    category: "fullstack",
    title: "The Big Picture",
    description:
      "Learning platform for student task management with real-time chat and calendar.",
    detailedDescription:
      "Developed a platform to help students manage school tasks while enabling coaches to assign tasks, provide resources, and share files. Features include drag-and-drop calendar, Socket.io chat system, and scrum board.",
    role: "Full-stack development including task management, real-time chat functionality, calendar system, and subscription management.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "Socket.io" },
      { name: "Stripe" },
    ],
    image: "/assets/projects/big-picture.png",
    live: "https://app.thebigpicture.net.au/big-picture-front/",
    slug: "the-big-picture"
  },
  {
    num: "03",
    category: "fullstack",
    title: "TATA Defense System",
    description: "Advanced inventory management for defense aircraft manufacturing tools.",
    detailedDescription:
      "Specialized inventory management solution for tracking tools used in defense aircraft manufacturing. Features QR code scanning, employee-based tracking, and automated reporting.",
    role: "Lead developer responsible for complete system architecture, QR code integration, shift-based reporting, and inventory tracking system.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PostgreSQL" },
      { name: "QR Integration" },
    ],
    image: "/assets/projects/tata-defense.png",
    live: "https://tataadmin.anyproject.tech",
    slug: "tata-defense-system"
  },
  {
    num: "04",
    category: "fullstack",
    title: "Cure and Care",
    description: "Healthcare e-commerce platform with doctor appointments and lab booking.",
    detailedDescription:
      "Comprehensive healthcare platform combining medical consultation services with e-commerce for medical products and lab test booking. Features WhatsApp video calls and online/offline consultations.",
    role: "Full-stack development including healthcare module design, appointment system, e-commerce integration, and WhatsApp API implementation.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "Razorpay" },
      { name: "WhatsApp API" },
    ],
    image: "/assets/projects/cure-care.png",
    live: "https://curemall.in",
    slug: "cure-and-care"
  },
  {
    num: "05",
    category: "fullstack",
    title: "Jivan Oil World",
    description: "E-commerce admin panel with Tally integration and WhatsApp/Mobile Apps ordering.",
    detailedDescription:
      "Comprehensive admin panel to manage listings, orders, and invoices with Tally integration. Features WhatsApp-based ordering and real-time inventory synchronization.",
    role: "Developed the admin panel with order handling, Tally integration, and multi-channel order processing capabilities.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Firebase" },
      { name: "Tally Integration" },
      { name: "WhatsApp API" },
    ],
    image: "/assets/projects/jivan-oil.png",
    live: "https://admin.jivanoilworld.com/",
    slug: "jivan-oil-world"
  },
  {
    num: "06",
    category: "fullstack",
    title: "WIRC of ICAI",
    description:
      "Platform for Chartered Accountants with job portal and event management.",
    detailedDescription:
      "Platform for Chartered Accountants featuring industry updates, job opportunities, articles, newsletters, and historical records. Includes helpdesk support, job portal, and event registration with payment gateway.",
    role: "Designed and developed the website, building all functionalities and APIs for event registrations, job listings, and payment integration.",
    stack: [
      { name: "React.js" },
      { name: "PostgreSQL" },
      { name: "GraphQL" },
      { name: "TypeORM" },
      { name: "cc avenue" },
      { name: "Typescript" },
    ],
    image: "/assets/projects/wirc.png",
    live: "https://wirc-icai.org/",
    slug: "wirc-of-icai"
  },
];

const Projects = () => {
  const router = useRouter();

  const handleProjectClick = (slug) => {
    router.push(`/projects/details?project=${slug}`);
  };

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
              className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer"
              onClick={() => handleProjectClick(project.slug)}
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
                  priority={project.num === "01"}
                />
              </div>

              {/* Project Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/95 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-bold text-lg">{project.title}</h3>
                <p className="text-sm mt-2 text-white/80">
                  {project.description}
                </p>

                {/* Stack */}
                <ul className="flex gap-2 text-xs mt-2 flex-wrap">
                  {project.stack.slice(0, 4).map((item, index) => (
                    <li key={index} className="text-[#70757f]">
                      {item.name}
                      {index !== Math.min(project.stack.length - 1, 3) && ","}
                    </li>
                  ))}
                  {project.stack.length > 4 && (
                    <li className="text-[#70757f]">+{project.stack.length - 4}</li>
                  )}
                </ul>

                {/* Buttons */}
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectClick(project.slug);
                    }}
                    className="w-10 h-10 bg-[#70757f] text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-all duration-300"
                  >
                    <span className="text-xs font-bold">VIEW</span>
                  </button>
                  {project.live !== "#" && (
                    <Link
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-10 h-10 bg-secondary text-[#70757f] rounded-full flex items-center justify-center cursor-pointer hover:bg-accent hover:text-primary transition-all duration-500">
                        <BsArrowUpRight className="text-xl" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>

              {/* Overlay for better click area */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/projects/details')}
            className="bg-[#70757f] hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
          >
            View Detailed Portfolio
            <BsArrowUpRight className="text-lg" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;