import { groq } from './groq';

export interface ProposalRequest {
  platform: string;
  jobTitle: string;
  jobDescription: string;
  clientName?: string;
  budget?: string;
  deadline?: string;
  skills: string;
  experienceLevel: string;
  tone: string;
  length: string;
  portfolioLinks?: string;
  customInstructions?: string;
}

export interface ProposalResponse {
  hook: string;
  introduction: string;
  problemUnderstanding: string;
  solution: string;
  skillsMapping: string;
  portfolioSection: string;
  timeline: string;
  budgetSection: string;
  callToAction: string;
  psLine: string;
  subjectLines: string[];
  followUpMessages: string[];
  linkedinDm: string;
  fiverrBid: string;
  winProbability: number;
  winProbabilityReasoning: string;
}

export async function generateProposalContent(data: ProposalRequest): Promise<ProposalResponse> {
  const systemPrompt = `
    You are PitchPro AI, an expert freelance copywriter who specializes in writing high-converting proposals for platforms like Upwork, Fiverr, Freelancer, and LinkedIn.
    
    Your goal is to write a proposal that:
    1. Grabs attention immediately (Great hook).
    2. Proves you read the job description (Mirroring language).
    3. Focuses on the client's problem, not just your skills.
    4. Proposes a clear solution/next step.
    
    You must output your response in valid JSON format ONLY. No markdown code blocks, no conversational text before or after.
  `;

  const userPrompt = `
    Generate a freelance proposal based on these details:
    
    - Platform: ${data.platform}
    - Job Title: ${data.jobTitle}
    - Job Description: "${data.jobDescription}"
    - Client Name: ${data.clientName || "Not specified"}
    - Budget: ${data.budget || "Not specified"}
    - Deadline: ${data.deadline || "Not specified"}
    - My Skills: ${data.skills}
    - Experience Level: ${data.experienceLevel}
    - Tone: ${data.tone}
    - Length: ${data.length}
    - Portfolio Links: ${data.portfolioLinks || "None provided"}
    - Custom Instructions: ${data.customInstructions || "None"}

    REQUIRED JSON STRUCTURE:
    {
      "hook": "Attention grabbing opening line",
      "introduction": "Personalized intro",
      "problemUnderstanding": "Demonstrate you understand their specific pain point",
      "solution": "How you will solve it",
      "skillsMapping": "Why your skills match their needs",
      "portfolioSection": "How to present the portfolio links",
      "timeline": "Estimated timeline based on job desc",
      "budgetSection": "Comment on budget if applicable",
      "callToAction": "Strong closing",
      "psLine": "A 'P.S.' value add",
      "subjectLines": ["Option 1", "Option 2", "Option 3"],
      "followUpMessages": ["Follow up 1 (2 days later)", "Follow up 2 (5 days later)"],
      "linkedinDm": "Short version for LinkedIn DM",
      "fiverrBid": "Short version for Fiverr",
      "winProbability": 85,
      "winProbabilityReasoning": "Brief explanation of the score"
    }
  `;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      // Using the correct, supported model ID for Llama 3.3 70B
      model: 'llama-3.3-70b-versatile', 
      temperature: 0.7,
      max_tokens: 3000,
      response_format: { type: 'json_object' },
    });

    const content = chatCompletion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content generated from AI service');
    }

    try {
      return JSON.parse(content) as ProposalResponse;
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Failed to parse AI response. Please try again.');
    }
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    // Enhance error message for user
    const errorMessage = error?.message || 'Failed to generate proposal. Please check your connection and try again.';
    throw new Error(errorMessage);
  }
}
