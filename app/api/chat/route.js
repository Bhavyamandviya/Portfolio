import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";

export async function POST(request) {
  try {
    const { input } = await request.json();
    const chat = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama3-70b-8192",
      temperature: 0.7,
      maxRetries: 2,
    });

    const inputType = detectInputType(input);
    const prompt = ChatPromptTemplate.fromMessages([
      ["system", getSystemPrompt(inputType)],
      ["human", "{input}"],
    ]);

    const chain = prompt.pipe(chat);
    const response = await chain.invoke({ input });

    return new Response(
      JSON.stringify({
        success: true,
        response: formatResponse(inputType, response.content, input),
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

// Helper functions
function detectInputType(input) {
  const lowerInput = input.toLowerCase();
  if (/hi|hello|hey/g.test(lowerInput)) return "greeting";
  if (/thank|thanks|appreciate/g.test(lowerInput)) return "thanks";
  if (/skill|tech|framework|tool|database/g.test(lowerInput)) return "skills";
  if (/project|ev charger|deal finder|wirc|big picture/g.test(lowerInput))
    return "project";
  if (/experience|work|job/g.test(lowerInput)) return "experience";
  if (/contact|email|linkedin|github/g.test(lowerInput)) return "contact";
  return "general";
}

function getSystemPrompt(inputType) {
  const basePrompt = `You are Bhavya Mandviya. Respond in concise bullet points:`;

  const prompts = {
    greeting: `${basePrompt}
        • Hi! I'm Bhavya Mandviya, MERN Stack Developer
        • How can I help you today?
        Suggestions:
        - Ask about my technical skills
        - Request project details
        - Get work experience highlights`,

    thanks: `${basePrompt}
        • You're welcome! 
        • Is there anything else I can help with?
        Suggestions:
        - More project details
        - Technical explanations
        - Contact information`,

    skills: `${basePrompt}
        • Languages: JavaScript, SQL, NoSQL
        • Frameworks: 
          - React.js, React Native, Next.js
          - Node.js, Express.js
        • Databases: MySQL, MongoDB
        • DevOps: AWS S3, Docker, GraphQL`,

    project: `${basePrompt}
        EV Charger:
        • Tech: MERN stack + AWS
        • Role: Full backend development
        • Scale: 10K+ active users
        
        Deal Finder:
        • Feature: Real-time analytics dashboard
        • Impact: 35% faster transactions`,

    experience: `${basePrompt}
        Webbrains Technologies:
        • 8+ production MERN applications
        • 40% query optimization
        
        Amitaujas LLP:
        • Led 4-member React team
        • 50% faster page loads via CDN`,

    contact: `${basePrompt}
        • Email: mandyiyabhavya@gmail.com
        • LinkedIn: linkedin.com/in/bhavya2617
        • GitHub: github.com/Bhavyamandyiya
        • Phone: +919284244459`,
  };

  return (
    prompts[inputType] ||
    `${basePrompt}
    • 2+ years professional experience
    • Specializing in high-performance apps
    • Education: BSc Computer Science
    How can I assist you further?`
  );
}

function formatResponse(inputType, content, originalInput) {
  // Special handling for thanks
  if (/ok|thank|thanks|appreciate/i.test(originalInput)) {
    return {
      content: `• You're welcome! ${content}`,
      suggestions: [
        "See more projects",
        "Request technical details",
        "Get work history",
      ],
    };
  }

  const enhancements = {
    greeting: {
      suggestions: ["Technical skills", "Project details", "Work history"],
      followUp: "What would you like to know?",
    },
    project: {
      followUp: "Interested in EV Charger, Deal Finder, or WIRC details?",
    },
    experience: {
      followUp: "Want specifics about Webbrains or Amitaujas projects?",
    },
  };

  return {
    content,
    ...(enhancements[inputType] || {}),
    showThanks: inputType !== "thanks", // Show thanks prompt for non-thank responses
  };
}
