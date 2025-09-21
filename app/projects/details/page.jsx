"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { BsArrowUpRight, BsArrowLeft, BsCalendar, BsPeople, BsGear, BsShop, BsHeart, BsBuilding } from "react-icons/bs";
import { Suspense } from "react";

const projectsDetailed = {
  "deal-finder": {
    num: "01",
    category: "fullstack",
    title: "Deal Finder",
    shortDescription: "Australia-based restaurant discovery platform with merchant management.",
    detailedDescription: "Deal Finder is a comprehensive Australia-based restaurant discovery platform that connects diners with restaurants through advanced booking, promotional events, and branding opportunities. The platform serves as a bridge between restaurants (merchants) and customers, offering location-based search functionality to help users find the most suitable restaurants nearby.",
    keyFeatures: [
      "Restaurant registration and merchant onboarding",
      "Advanced booking system for parties and events",
      "Location-based restaurant search with real-time availability",
      "Admin panel for platform management",
      "Merchant panel for restaurant owners",
      "Two dedicated mobile applications",
      "Subscription-based business model",
      "CI/CD pipeline implementation",
      "Stripe payment gateway integration"
    ],
    technicalHighlights: [
      "Built comprehensive API ecosystem serving web and mobile platforms",
      "Implemented geolocation services for nearest restaurant discovery",
      "Developed subscription management system with automated billing",
      "Created real-time availability tracking system",
      "Integrated payment processing with Stripe for secure transactions"
    ],
    role: "Full-stack development including backend architecture, admin panel, merchant panel, and mobile API development. Implemented CI/CD pipeline and payment gateway integration.",
    impact: "Serving 300+ merchant partners across multiple Australian cities with automated booking and payment processing.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "Stripe" },
      { name: "React Native" }
    ],
    image: "/assets/projects/Deal-Finder.png",
    live: "https://dealfinderapp.com/",
    icon: BsShop
  },
  "the-big-picture": {
    num: "02",
    category: "fullstack",
    title: "The Big Picture",
    shortDescription: "Learning platform for student task management and progress tracking.",
    detailedDescription: "The Big Picture is an innovative learning platform designed to help students effectively manage their academic workload and track their progress. The platform focuses on time management and task organization to ensure balanced growth and improved academic performance.",
    keyFeatures: [
      "Interactive React calendar with drag-and-drop functionality",
      "Real-time chat system using Socket.io for student communication",
      "Scrum board for agile task management",
      "Flexible task creation (daily, weekly, fortnightly, single-day)",
      "Progress tracking and analytics",
      "Subscription-based access model",
      "Stripe payment integration",
      "Student performance dashboard"
    ],
    technicalHighlights: [
      "Implemented real-time WebSocket connections for instant messaging",
      "Built drag-and-drop calendar interface for intuitive scheduling",
      "Created flexible task management system with multiple recurrence patterns",
      "Developed analytics dashboard for tracking student progress",
      "Integrated payment processing for subscription management"
    ],
    role: "Full-stack development including real-time chat implementation, calendar system development, and subscription management with payment gateway integration.",
    impact: "Helping 200+ students manage their academic workload with 95% task completion tracking accuracy.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "Socket.io" },
      { name: "Stripe" }
    ],
    image: "/assets/projects/big-picture.png",
    live: "https://app.thebigpicture.net.au/big-picture-front/",
    icon: BsPeople
  },
  "tata-defense-system": {
    num: "03",
    category: "fullstack",
    title: "TATA Defense Inventory System",
    shortDescription: "Advanced inventory management system for defense aircraft manufacturing tools.",
    detailedDescription: "TATA Defense Inventory System is a specialized inventory management solution developed for tracking and managing tools used in defense aircraft manufacturing. This project supports India's defense manufacturing capabilities for international contracts, including the Spain project, ensuring efficient tool management and maintenance tracking.",
    keyFeatures: [
      "Comprehensive tool inventory tracking system",
      "QR code scanning for quick tool identification",
      "Employee-based tool assignment and tracking",
      "Calibration and maintenance scheduling",
      "Real-time location tracking of tools",
      "Shift-based reporting system",
      "Tool usage history and analytics",
      "Maintenance alert system"
    ],
    technicalHighlights: [
      "Implemented QR code scanning system reducing search time by 85%",
      "Built real-time tracking for 10,000+ aircraft parts",
      "Developed automated reporting system based on employee shifts",
      "Created maintenance scheduling with alert notifications",
      "Integrated barcode/QR code generation and scanning functionality"
    ],
    role: "Lead developer responsible for complete system architecture, QR code integration, reporting system, and database design for inventory tracking.",
    impact: "Managing 10,000+ aircraft parts with 99.5% inventory accuracy and 85% reduction in tool search time.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "PostgreSQL" },
      { name: "QR Code Integration" }
    ],
    image: "/assets/projects/tata-defense.png",
    live: "https://tataadmin.anyproject.tech",
    icon: BsGear
  },
  "cure-and-care": {
    num: "04",
    category: "fullstack",
    title: "Cure and Care",
    shortDescription: "Healthcare e-commerce platform with doctor appointments and lab test booking.",
    detailedDescription: "Cure and Care is a comprehensive healthcare e-commerce platform that combines medical consultation services with online pharmacy and lab test booking. The platform offers both online and offline doctor consultation options, along with a complete e-commerce solution for medical products and lab services.",
    keyFeatures: [
      "Doctor appointment booking system",
      "Online and offline consultation options",
      "WhatsApp video call integration for online consultations",
      "Lab test booking and management",
      "E-commerce module for medical products",
      "Third-party API integration for shipping",
      "Razorpay payment gateway integration",
      "Patient history and prescription management"
    ],
    technicalHighlights: [
      "Integrated WhatsApp Business API for video consultations",
      "Built comprehensive appointment scheduling system",
      "Implemented secure payment processing with Razorpay",
      "Developed e-commerce functionality with shipping API integration",
      "Created patient management system with medical history tracking"
    ],
    role: "Full-stack development including healthcare module design, appointment system, e-commerce integration, and payment gateway implementation.",
    impact: "Serving 500+ patients monthly with 99.8% payment success rate and streamlined healthcare service delivery.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "MongoDB" },
      { name: "Razorpay" },
      { name: "WhatsApp API" }
    ],
    image: "/assets/projects/cure-care.png",
    live: "https://curemall.in",
    icon: BsHeart
  },
  "jivan-oil-world": {
    num: "05",
    category: "fullstack",
    title: "Jivan Oil World",
    shortDescription: "E-commerce management system with Tally integration and WhatsApp order handling.",
    detailedDescription: "Jivan Oil World is a comprehensive e-commerce management system designed to handle online orders with seamless integration to Tally accounting software. The platform manages inventory, processes orders from multiple channels including WhatsApp and mobile app, ensuring real-time stock tracking.",
    keyFeatures: [
      "Order management system with multi-channel support",
      "Tally integration for automated stock tracking",
      "WhatsApp-based order processing",
      "Mobile app integration",
      "Real-time inventory synchronization",
      "Automated invoice generation",
      "Customer management system",
      "Sales analytics and reporting"
    ],
    technicalHighlights: [
      "Built seamless Tally integration for stock synchronization",
      "Implemented WhatsApp API for order processing",
      "Developed real-time inventory tracking system",
      "Created automated invoice generation with Tally sync",
      "Built multi-channel order aggregation system"
    ],
    role: "Developed the complete admin panel with order handling system, Tally integration, and multi-channel order processing capabilities.",
    impact: "Processing hundreds of orders monthly with automated stock management and invoice generation, eliminating manual inventory tracking.",
    stack: [
      { name: "React.js" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Firebase" },
      { name: "Tally Integration" },
      { name: "WhatsApp API" }
    ],
    image: "/assets/projects/jivan-oil.png",
    live: "https://admin.jivanoilworld.com/",
    icon: BsShop
  },
  "wirc-of-icai": {
    num: "06",
    category: "fullstack",
    title: "WIRC of ICAI",
    shortDescription: "Platform for Chartered Accountants with job portal and event management.",
    detailedDescription: "WIRC of ICAI is a comprehensive platform serving the Western India Regional Council of the Institute of Chartered Accountants of India. The platform provides industry updates, job opportunities, articles, newsletters, and manages historical records for CA members across Western India.",
    keyFeatures: [
      "Member management for 15,000+ CAs",
      "Job portal with placement tracking",
      "Event registration and management",
      "Payment gateway integration",
      "Newsletter and article publishing",
      "Helpdesk support system",
      "Historical records management",
      "Industry updates and notifications"
    ],
    technicalHighlights: [
      "Built scalable platform serving 15,000+ members",
      "Implemented job portal with 80% placement success rate",
      "Developed event management processing Rs. 10+ lakhs annually",
      "Created helpdesk system with 24-hour response time",
      "Integrated payment processing for event registrations"
    ],
    role: "Designed and developed the complete website, building all functionalities including APIs for event registrations, job listings, and payment integration.",
    impact: "Serving 15,000+ CA members with 200+ monthly job postings and 50+ annual events management.",
    stack: [
      { name: "React.js" },
      { name: "PostgreSQL" },
      { name: "GraphQL" },
      { name: "TypeORM" }
    ],
    image: "/assets/projects/wirc.png",
    live: "https://wirc-icai.org/",
    icon: BsBuilding
  }
};

// Separate component for handling search params
const ProjectDetailsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    const projectSlug = searchParams.get('project');
    if (projectSlug && projectsDetailed[projectSlug]) {
      setSelectedProject(projectsDetailed[projectSlug]);
      setShowAllProjects(false);
    } else {
      setShowAllProjects(true);
    }
  }, [searchParams]);

  if (showAllProjects) {
    return (
      <motion.div
        initial={{ y: "-200vh" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1 }}
        className="min-h-screen py-12 bg-black"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <button
              onClick={() => router.back()}
              className="mb-6 flex items-center gap-2 text-white hover:text-white transition-colors duration-200"
            >
              <BsArrowLeft className="text-lg" />
              Back to Projects
            </button>
            <h1 className="text-5xl font-bold text-white mb-4">Project Portfolio</h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Detailed overview of my full-stack development projects, showcasing innovative solutions 
              and technical expertise across various industries.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {Object.entries(projectsDetailed).map(([slug, project], index) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-secondary rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-600"
                  onClick={() => router.push(`/projects/details?project=${slug}`)}
                >
                  {/* Project Header */}
                  <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-[#3d4044]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconComponent className="text-white text-6xl mb-4" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                          {project.category}
                        </span>
                        <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                          Project #{project.num}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-white mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-medium border border-secondary"
                          >
                            {tech.name}
                          </span>
                        ))}
                        {project.stack.length > 4 && (
                          <span className="bg-gray-600 text-gray-400 px-3 py-1 rounded-full text-xs font-medium border border-secondary">
                            +{project.stack.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gray-600 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200">
                        View Details
                      </button>
                      {project.live !== "#" && (
                        <Link
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-gray-600 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-200 border border-secondary"
                        >
                          <BsArrowUpRight className="text-xl" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  if (!selectedProject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Project not found</h1>
          <button
            onClick={() => router.push('/projects')}
            className="bg-secondary hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const IconComponent = selectedProject.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black"
    >
      {/* Header */}
      <div className="relative">
        <div className="container mx-auto px-4 py-12">
          <button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-white hover:text-white transition-colors duration-200"
          >
            <BsArrowLeft className="text-lg" />
            Back to Projects
          </button>
          <div className="flex items-center gap-6 mb-6">
            <IconComponent className="text-6xl text-white" />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  {selectedProject.category}
                </span>
                <span className="bg-white/10 px-3 py-1 rounded-full text-sm font-medium border border-white/20">
                  Project #{selectedProject.num}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{selectedProject.title}</h1>
              <p className="text-xl text-white">{selectedProject.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-secondary rounded-2xl p-8 shadow-lg mb-8 border border-gray-600"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Project Overview</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                {selectedProject.detailedDescription}
              </p>

              <h3 className="text-xl font-bold text-white mb-4">Impact & Results</h3>
              <p className="text-gray-400 leading-relaxed">
                {selectedProject.impact}
              </p>
            </motion.div>

            {/* Technology Stack */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary rounded-2xl p-8 shadow-lg border border-gray-600"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Technology Stack</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.stack.map((tech, index) => (
                  <div
                    key={index}
                    className="bg-gray-600 text-white px-4 py-3 rounded-lg text-center font-medium border border-secondary hover:bg-secondary transition-colors duration-200"
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-secondary rounded-2xl p-8 shadow-lg mb-8 border border-gray-600"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Key Features</h3>
              <ul className="space-y-3">
                {selectedProject.keyFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-400 leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-secondary rounded-2xl p-8 shadow-lg border border-gray-600"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Technical Highlights</h3>
              <ul className="space-y-3">
                {selectedProject.technicalHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-400 leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          {selectedProject.live !== "#" && (
            <Link
              href={selectedProject.live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg border border-gray-600"
            >
              <BsArrowUpRight className="text-lg" />
              View Live Project
            </Link>
          )}
          <button
            onClick={() => router.push('/projects/details')}
            className="bg-gray-600 hover:bg-secondary text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200 border border-secondary"
          >
            View All Projects
          </button>
        </motion.div>

        {/* Related Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Other Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(projectsDetailed)
              .filter(([slug]) => slug !== searchParams.get('project'))
              .slice(0, 3)
              .map(([slug, project]) => {
                const ProjectIcon = project.icon;
                return (
                  <div
                    key={slug}
                    onClick={() => router.push(`/projects/details?project=${slug}`)}
                    className="bg-secondary rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-600 hover:border-secondary"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center border border-secondary">
                        <ProjectIcon className="text-white text-xl" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-white transition-colors duration-200">
                          {project.title}
                        </h4>
                        <p className="text-sm text-gray-500">{project.category}</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm line-clamp-2">{project.shortDescription}</p>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Loading component
const ProjectDetailsLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="text-center">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-700 rounded w-48 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-700 rounded w-32 mx-auto"></div>
      </div>
    </div>
  </div>
);

// Main component with Suspense wrapper
const ProjectDetails = () => {
  return (
    <Suspense fallback={<ProjectDetailsLoading />}>
      <ProjectDetailsContent />
    </Suspense>
  );
};

export default ProjectDetails;