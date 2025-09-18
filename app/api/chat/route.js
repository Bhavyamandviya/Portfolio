import Groq from "groq-sdk";

export async function POST(request) {
  try {
    const { input } = await request.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const inputType = detectInputType(input);
    const systemPrompt = getSystemPrompt(inputType);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: input,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    const response = chatCompletion.choices[0]?.message?.content || "";

    return new Response(
      JSON.stringify({
        success: true,
        response: formatResponse(inputType, response, input),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing chat request:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      { status: 500 }
    );
  }
}

function detectInputType(input) {
  const lowerInput = input.toLowerCase();
  if (/hi|hello|hey|start/g.test(lowerInput)) return "greeting";
  if (/thank|thanks|appreciate/g.test(lowerInput)) return "thanks";
  if (/skill|tech|framework|tool|database|stack/g.test(lowerInput))
    return "skills";
  if (
    /project|cure|tata|wirc|deal finder|big picture|healthcare|defense|inventory/g.test(
      lowerInput
    )
  )
    return "project";
  if (/experience|work|job|webbrains|amitaujas/g.test(lowerInput))
    return "experience";
  if (/contact|email|linkedin|github|phone/g.test(lowerInput)) return "contact";
  if (/education|college|degree|graduation/g.test(lowerInput))
    return "education";
  return "general";
}

function getSystemPrompt(inputType) {
  const basePrompt = `You are Bhavya Mandviya, a MERN Stack Developer from Vadodara, Gujarat. Always respond using ONLY bullet points with • symbol. Keep responses concise and impactful:`;

  const prompts = {
    greeting: `${basePrompt}
        • Hi! I'm Bhavya Mandviya - MERN Stack Developer
        • 2+ years experience serving 25,000+ users
        • 10-15 enterprise projects delivered
        • Rs. 20+ lakhs in transactions processed
        • Specialized in scalable web applications
        
        • Ask me about major projects (Healthcare, Defense, CA platform)
        • Technical expertise & achievements
        • Professional experience details`,

    thanks: `${basePrompt}
        • You're welcome! Happy to help
        • Feel free to explore more about my work
        • Project deep-dives available
        • Technical achievements ready to share
        • Contact information accessible`,

    skills: `${basePrompt}
        • Frontend: React.js, Next.js, React Native, HTML5, CSS3
        • Backend: Node.js, Express.js, RESTful APIs, GraphQL
        • Databases: MongoDB, MySQL, PostgreSQL
        • Payment Integration: Razorpay (Rs. 20+ lakhs processed)
        • DevOps: Docker, Linux, Git, AWS S3
        • Performance: 40% faster load times achieved
        • Query optimization: 60% improvement delivered
        • APIs: 50+ built, handling 10,000+ daily requests
        • Uptime: 99.9% reliability maintained`,

    project: `${basePrompt}
        • Cure and Care (Healthcare Platform):
        • 500+ patients served monthly
        • Rs. 2+ lakhs transactions processed
        • 99.8% payment success rate
        • 70% faster booking vs traditional methods
        
        • TATA Defense Inventory System:
        • 10,000+ aircraft parts tracked
        • QR-based tracking system implemented
        • 85% search time reduction (30min → 4min)
        • 99.5% inventory accuracy achieved
        
        • WIRC OF ICAI (CA Platform):
        • 15,000+ CA members served
        • Rs. 10+ lakhs in fees processed
        • 80% placement success rate
        • 500+ monthly queries handled
        
        • Deal Finder (Restaurant Platform):
        • 2,000+ restaurants indexed
        • 300+ merchant partners
        • <2sec response time maintained`,

    experience: `${basePrompt}
        • Webbrains Technologies (Apr 2024 - Present):
        • 10+ complex web applications built
        • 25,000+ users served across platforms
        • 50+ RESTful APIs developed
        • Rs. 20+ lakhs transactions processed
        • 40% performance improvement delivered
        • Healthcare, e-commerce, inventory systems
        
        • Amitaujas LLP (Feb 2023 - Feb 2024):
        • Web & mobile app development
        • React.js, React Native, Expo expertise
        • 300+ partner merchant systems
        • Secure payment gateways implemented
        • Admin panels & database optimization`,

    contact: `${basePrompt}
        • Email: mandviyabhavya@gmail.com
        • Phone: +91 9284244459
        • Location: Vadodara, Gujarat
        • LinkedIn: linkedin.com/in/bhavya2617
        • 2+ years professional experience
        • 25,000+ users impact delivered
        • Rs. 20+ lakhs transactions processed`,

    education: `${basePrompt}
        • B.Tech in Computer Science Engineering (2019-2023)
        • Babaria Institute of Technology, Vadodara
        • Full-stack development specialization
        • Started as Software Developer (Feb 2023)
        • Promoted to MERN Stack Developer (Apr 2024)
        • 2+ years delivering enterprise solutions`,
  };

  return (
    prompts[inputType] ||
    `${basePrompt}
    • 2+ years MERN Stack Developer experience
    • 25,000+ users served across 10-15 enterprise projects
    • Rs. 20+ lakhs in transactions processed
    • Healthcare, E-commerce, Defense, Inventory systems expertise
    • How can I help you learn more about my work?`
  );
}

function formatResponse(inputType, content, originalInput) {
  // Special handling for thanks
  if (/ok|thank|thanks|appreciate/i.test(originalInput)) {
    return {
      content: `• You're welcome! ${content}`,
      suggestions: [
        "Explore major projects",
        "See technical achievements",
        "Get contact info",
      ],
    };
  }

  const enhancements = {
    greeting: {
      suggestions: [
        "Show technical skills",
        "Major projects overview",
        "Professional experience",
      ],
      followUp: "What interests you most about my work?",
    },
    project: {
      suggestions: [
        "Cure & Care details",
        "TATA Defense system",
        "WIRC platform",
      ],
      followUp: "Which project would you like to explore in detail?",
    },
    experience: {
      suggestions: [
        "Webbrains achievements",
        "Amitaujas projects",
        "Technical growth",
      ],
      followUp: "Want to know about specific roles or achievements?",
    },
    skills: {
      suggestions: [
        "Performance optimizations",
        "Payment integrations",
        "API development",
      ],
      followUp: "Interested in any specific technical area?",
    },
  };

  return {
    content,
    ...(enhancements[inputType] || {}),
    showThanks: inputType !== "thanks",
  };
}
