"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowUpRight, BsShop, BsPeople, BsGear, BsHeart, BsBuilding, BsCode, BsLaptop, BsEnvelope, BsPhone } from "react-icons/bs";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const projectsData = {
    "deal-finder": {
      title: "Deal Finder",
      description: "Australia-based restaurant discovery platform with merchant management serving 300+ merchant partners.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe", "React Native"],
      live: "https://dealfinderapp.com/",
      icon: BsShop,
      impact: "Serving 300+ merchant partners across multiple Australian cities"
    },
    "the-big-picture": {
      title: "The Big Picture",
      description: "Learning platform for student task management and progress tracking with real-time chat system.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Stripe"],
      live: "https://app.thebigpicture.net.au/big-picture-front/",
      icon: BsPeople,
      impact: "Helping 200+ students manage their academic workload with 95% task completion tracking accuracy"
    },
    "tata-defense": {
      title: "TATA Defense Inventory System",
      description: "Advanced inventory management system for defense aircraft manufacturing tools with QR code scanning.",
      stack: ["React.js", "Node.js", "Express.js", "PostgreSQL", "QR Code Integration"],
      live: "https://tataadmin.anyproject.tech",
      icon: BsGear,
      impact: "Managing 10,000+ aircraft parts with 99.5% inventory accuracy"
    },
    "cure-and-care": {
      title: "Cure and Care",
      description: "Healthcare e-commerce platform with doctor appointments and lab test booking.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Razorpay", "WhatsApp API"],
      live: "https://curemall.in",
      icon: BsHeart,
      impact: "Serving 500+ patients monthly with 99.8% payment success rate"
    },
    "wirc-icai": {
      title: "WIRC of ICAI",
      description: "Platform for Chartered Accountants with job portal and event management serving 15,000+ CAs.",
      stack: ["React.js", "PostgreSQL", "GraphQL", "TypeORM"],
      live: "https://wirc-icai.org/",
      icon: BsBuilding,
      impact: "Serving 15,000+ CA members with 200+ monthly job postings"
    }
  };

  const knowledgeBase = {
    skills: {
      frontend: ["React.js", "Next.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Material-UI", "Framer Motion"],
      backend: ["Node.js", "Express.js","REST APIs", "GraphQL", "Socket.io"],
      databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
      tools: ["Git", "Docker", "AWS", "Stripe", "Razorpay", "WhatsApp API", "QR Code Integration"],
      mobile: ["React Native", "Mobile App Development"]
    },
    experience: "3+ years of full-stack development experience",
    specialization: "Full-stack web development with expertise in React.js, Node.js, and modern web technologies",
    contact: {
      email: "bhavya@example.com",
      phone: "+91 XXXXX XXXXX",
      location: "Vadodara, Gujarat, India"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Project-related queries
    if (input.includes("project") || input.includes("work")) {
      if (input.includes("deal finder") || input.includes("restaurant")) {
        return {
          type: "project",
          content: projectsData["deal-finder"],
          suggestions: ["Tell me about TATA Defense project", "What are your technical skills?", "How can I contact you?"]
        };
      }
      if (input.includes("big picture") || input.includes("student") || input.includes("learning")) {
        return {
          type: "project",
          content: projectsData["the-big-picture"],
          suggestions: ["Show me healthcare projects", "What technologies do you use?", "Tell me about defense projects"]
        };
      }
      if (input.includes("tata") || input.includes("defense") || input.includes("inventory")) {
        return {
          type: "project",
          content: projectsData["tata-defense"],
          suggestions: ["Tell me about Deal Finder", "What are your skills?", "Show me all projects"]
        };
      }
      if (input.includes("cure") || input.includes("care") || input.includes("healthcare") || input.includes("medical")) {
        return {
          type: "project",
          content: projectsData["cure-and-care"],
          suggestions: ["Tell me about WIRC project", "What's your experience?", "How can I hire you?"]
        };
      }
      if (input.includes("wirc") || input.includes("icai") || input.includes("chartered")) {
        return {
          type: "project",
          content: projectsData["wirc-icai"],
          suggestions: ["Show me e-commerce projects", "What technologies do you prefer?", "Tell me about your experience"]
        };
      }
      
      // General projects query
      return {
        type: "projects_list",
        content: "I've worked on several exciting projects across different industries:",
        projects: Object.values(projectsData),
        suggestions: ["Tell me about Deal Finder specifically", "What are your technical skills?", "How can I contact you?"]
      };
    }

    // Skills and technical queries
    if (input.includes("skill") || input.includes("technology") || input.includes("tech") || input.includes("stack")) {
      return {
        type: "skills",
        content: "Here are my technical skills and expertise:",
        skills: knowledgeBase.skills,
        suggestions: ["Tell me about your projects", "What's your experience level?", "How can I contact you?"]
      };
    }

    // Experience queries
    if (input.includes("experience") || input.includes("background") || input.includes("years")) {
      return {
        type: "text",
        content: `I have ${knowledgeBase.experience} specializing in ${knowledgeBase.specialization}. I've successfully delivered multiple full-stack applications across various industries including healthcare, education, defense, and e-commerce.`,
        suggestions: ["Show me your best projects", "What technologies do you use?", "How can I contact you?"]
      };
    }

    // Contact queries
    if (input.includes("contact") || input.includes("hire") || input.includes("email") || input.includes("phone") || input.includes("reach")) {
      return {
        type: "contact",
        content: "I'd love to discuss potential opportunities! Here's how you can reach me:",
        contact: knowledgeBase.contact,
        suggestions: ["Tell me about your projects", "What are your skills?", "What's your experience?"]
      };
    }

    // About queries
    if (input.includes("about") || input.includes("who are you") || input.includes("introduce")) {
      return {
        type: "text",
        content: "I'm Bhavya, a passionate full-stack developer with 3+ years of experience. I specialize in building modern web applications using React.js, Node.js, and various other technologies. I've worked on projects ranging from e-commerce platforms to healthcare systems and defense inventory management.",
        suggestions: ["Show me your projects", "What are your technical skills?", "How can I contact you?"]
      };
    }

    // Default fallback for out-of-scope questions
    return {
      type: "fallback",
      content: "I'm sorry, but I can only help you with information about Bhavya's professional background, projects, skills, and contact details.",
      suggestions: ["Tell me about your projects", "What are your technical skills?", "How can I contact you?"]
    };
  };

  const handleSendMessage = async (messageText) => {
    const userMessage = { text: messageText, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = generateResponse(messageText);
    
    setMessages((prev) => [
      ...prev,
      {
        ...response,
        sender: "bot",
      },
    ]);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await handleSendMessage(input);
  };

  const renderBotMessage = (message) => {
    switch (message.type) {
      case "project":
        const IconComponent = message.content.icon;
        return (
          <div className="space-y-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-[#70757f] rounded-lg flex items-center justify-center">
                <IconComponent className="text-white text-lg" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{message.content.title}</h4>
                <p className="text-sm text-gray-600">Full-stack Project</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{message.content.description}</p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs font-semibold text-gray-600 mb-2">Tech Stack:</p>
              <div className="flex flex-wrap gap-1">
                {message.content.stack.slice(0, 4).map((tech, i) => (
                  <span key={i} className="bg-[#70757f] text-white px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {message.content.impact && (
              <div className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
                <p className="text-xs font-semibold text-blue-700 mb-1">Impact:</p>
                <p className="text-xs text-blue-600">{message.content.impact}</p>
              </div>
            )}
            {message.content.live && (
              <a
                href={message.content.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#70757f] text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-gray-600 transition-colors"
              >
                <BsArrowUpRight />
                View Live Project
              </a>
            )}
          </div>
        );

      case "projects_list":
        return (
          <div className="space-y-4">
            <p className="text-gray-700 text-sm">{message.content}</p>
            <div className="grid grid-cols-1 gap-3">
              {message.projects.slice(0, 3).map((project, i) => {
                const ProjectIcon = project.icon;
                return (
                  <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#70757f] rounded-lg flex items-center justify-center flex-shrink-0">
                        <ProjectIcon className="text-white text-sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-semibold text-gray-800 text-sm">{project.title}</h5>
                        <p className="text-xs text-gray-600 truncate">{project.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-600 italic">Ask me about any specific project for detailed information!</p>
          </div>
        );

      case "skills":
        return (
          <div className="space-y-3">
            <p className="text-gray-700 text-sm">{message.content}</p>
            <div className="space-y-2">
              {Object.entries(message.skills).map(([category, skillList]) => (
                <div key={category} className="bg-gray-50 rounded-lg p-3">
                  <h5 className="font-semibold text-gray-800 text-sm mb-2 capitalize">{category}:</h5>
                  <div className="flex flex-wrap gap-1">
                    {skillList.slice(0, 6).map((skill, i) => (
                      <span key={i} className="bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "contact":
        return (
          <div className="space-y-3">
            <p className="text-gray-700 text-sm">{message.content}</p>
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <BsEnvelope className="text-[#70757f] text-lg" />
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-medium text-gray-800">mandviyabhavya@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BsPhone className="text-[#70757f] text-lg" />
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm font-medium text-gray-800">+91 9284244459</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BsLaptop className="text-[#70757f] text-lg" />
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-sm font-medium text-gray-800">Vadodara, Gujarat, India</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-600 italic">Feel free to reach out for project discussions or collaborations!</p>
          </div>
        );

      case "fallback":
        return (
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">{message.content}</p>
            </div>
            <p className="text-xs text-gray-600">Here's what I can help you with:</p>
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs font-medium text-gray-700">• Project details and technical implementations</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs font-medium text-gray-700">• Technical skills and technology stack</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs font-medium text-gray-700">• Professional experience and background</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <p className="text-xs font-medium text-gray-700">• Contact information and availability</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="whitespace-pre-line text-sm text-gray-700">
            {message.content}
          </div>
        );
    }
  };

  const quickStartButtons = [
    { text: "Tell me about your projects", icon: BsCode },
    { text: "What are your technical skills?", icon: BsLaptop },
    { text: "How can I contact you?", icon: BsEnvelope }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-80 h-[500px] bg-white rounded-lg shadow-xl flex flex-col border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#70757f] to-gray-600 text-white p-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold">Bhavya's AI Assistant</h3>
                <p className="text-xs opacity-90">Ask me about projects & skills</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 h-full flex items-center justify-center">
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-[#70757f] rounded-full flex items-center justify-center mx-auto">
                      <BsCode className="text-white text-lg" />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      Hi! I'm Bhavya's AI assistant.
                    </p>
                    <p className="text-xs text-gray-600 mb-4">
                      Ask me about projects, skills, or how to get in touch!
                    </p>
                    <div className="space-y-2">
                      {quickStartButtons.map((button, i) => {
                        const ButtonIcon = button.icon;
                        return (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(button.text)}
                            className="w-full bg-white hover:bg-gray-50 text-[#70757f] px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-gray-200 flex items-center gap-3"
                          >
                            <ButtonIcon className="text-[#70757f]" />
                            {button.text}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                        message.sender === "user"
                          ? "bg-[#70757f] text-white"
                          : "bg-white border border-gray-200 text-gray-800"
                      }`}
                    >
                      {message.sender === "bot"
                        ? renderBotMessage(message)
                        : message.text}
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#70757f] animate-bounce"></div>
                      <div
                        className="w-2 h-2 rounded-full bg-[#70757f] animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-[#70757f] animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Show suggestions after bot response */}
              {messages.length > 0 && !isLoading && messages[messages.length - 1].sender === "bot" && messages[messages.length - 1].suggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2"
                >
                  <p className="text-xs text-gray-600 font-medium">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {messages[messages.length - 1].suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-[#70757f] px-3 py-1 rounded-full transition-colors border border-gray-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t border-gray-200 bg-white p-3">
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about Bhavya's work..."
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70757f] focus:border-transparent text-sm text-[#70757f]"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-[#70757f] text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Send"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-[#70757f] to-gray-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 relative"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;